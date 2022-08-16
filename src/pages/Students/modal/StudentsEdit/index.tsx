import React, { useEffect, useState } from 'react';
import moment from 'moment';
import stylesStud from '../../../pagesStyle.module.scss';

import { useStudentsContext } from '../../../../context/students';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { IStudentCreateParams } from '../../../../hooks/useStudents';
import ModalInput from '../../../../components/common/ModalInput';
import SelectGroupById from '../../../../components/common/Select/SelectGroupById';
import { Email, EmailValidation } from '../../../../types/regExp';
import SelectDate from '../../../../components/common/datePicker/SelectDate';
import SelectIsFullTime from '../../../../components/common/Select/SelectIsFullTime';
import { useMessagesContext } from '../../../../context/useMessagesContext';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
  id: number;
}

const formInitialData = {
  dateOfBirth: '',
  groupId: 0,
  user: {
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    role: 'student',
  },
  orderNumber: '',
  edeboId: '',
  isFullTime: undefined,
};

export const StudentsEditModal = ({ modalActive, closeModal, id }: IGroupCreateModal): JSX.Element => {
  const { studentEdit, getStudentById } = useStudentsContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IStudentCreateParams>(formInitialData);
  const { addInfo } = useMessagesContext();

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);

    if (formData.dateOfBirth
      && formData.edeboId.length === 8
      && formData.groupId.toString().length > 1
      && `${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20
      && formData.user.firstName
      && formData.user.lastName
      && formData.user.patronymic
      && Email.test(formData.user.email)
    ) {
      studentEdit?.studentEdit(formData, id);
    }
  };

  useEffect(() => {
    if (id) {
      getStudentById?.getStudentId({ id: `${id}` });
    }
  }, [id]);

  useEffect(() => {
    if (studentEdit?.data) {
      handleClose();
      addInfo(`Студента
    "${formData.user.lastName} ${formData.user.firstName} ${formData.user.patronymic}" успішно відредаговано`);
    }
  }, [studentEdit?.data]);

  useEffect(() => {
    if (getStudentById?.data) {
      const data = {
        dateOfBirth: moment(getStudentById.data.dateOfBirth).format('DD.MM.YYYY'),
        groupId: getStudentById.data.group.id,
        user: {
          firstName: getStudentById.data.user.firstName,
          lastName: getStudentById.data.user.lastName,
          patronymic: getStudentById.data.user.patronymic,
          email: getStudentById.data.user.email,
          role: 'student',
        },
        orderNumber: getStudentById.data.orderNumber,
        edeboId: getStudentById.data.edeboId,
        isFullTime: getStudentById.data.isFullTime,
      };

      setFormData(data);
    }
  }, [getStudentById?.data]);

  return (
    <ModalWindow modalTitle="Редагування студента" active={modalActive} closeModal={handleClose}>
      <form className={stylesStud.form} onSubmit={onSubmit}>
        <ModalInput
          required
          label="Прізвище"
          placeholder="Прізвище"
          value={formData.user.lastName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, lastName: event.target.value.slice(0, 15) } });
          }}
          error={isSubmitted && !formData.user.lastName ? 'Прізвище не введено' : ''}
        />
        <ModalInput
          required
          label="Ім`я"
          placeholder="Ім`я"
          value={formData.user.firstName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, firstName: event.target.value.slice(0, 10) } });
          }}
          error={isSubmitted && !formData.user.firstName ? 'Ім`я не введено' : ''}
        />
        <ModalInput
          required
          label="По батькові"
          placeholder="По батькові"
          value={formData.user.patronymic}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, patronymic: event.target.value.slice(0, 15) } });
          }}
          error={isSubmitted && !formData.user.patronymic ? 'По батькові не введено' : ''}
        />
        <SelectDate
          required
          label="Дата народження"
          placeholder="Дата народження"
          onChange={(item) => setFormData({ ...formData, dateOfBirth: item ? moment(item).format('DD.MM.YYYY') : '' })}
          value={formData.dateOfBirth}
          error={isSubmitted && !formData.dateOfBirth ? 'Дату народження не введено' : ''}
        />
        <SelectGroupById
          type="modal"
          label="Група"
          placeholder="Група"
          isClearable
          isSearchable
          value={formData.groupId}
          onChange={(value) => {
            setFormData({ ...formData, groupId: +value });
          }}
          error={isSubmitted && !formData.groupId ? 'Жодної групи не обрано' : ''}
        />
        <ModalInput
          required
          label="Номер наказу"
          placeholder="Номер наказу"
          value={formData.orderNumber}
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value.slice(0, 20) });
          }}
          error={isSubmitted && (`${formData.orderNumber}`.length < 6
          || `${formData.orderNumber}`.length > 20
            ? 'Номер наказу повинен містити не менше 6-ти символів.' : '')}
        />
        <ModalInput
          required
          label="ЄДЕБО"
          placeholder="ЄДЕБО"
          value={formData.edeboId}
          onChange={(event) => {
            setFormData({ ...formData, edeboId: event.target.value.slice(0, 8) });
          }}
          error={isSubmitted && formData.edeboId.length !== 8
            ? 'Номер ЄДЕБО повинен містити 8 символів' : ''}
        />
        <ModalInput
          required
          label="E-Mail"
          placeholder="E-Mail"
          value={formData.user.email}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, email: event.target.value.slice(0, 40) } });
          }}
          error={isSubmitted && !Email.test(formData.user.email)
            ? (formData.user.email.length < 1 ? 'E-mail не введено' : 'E-mail введено не вірно') : ''}
          pattern={EmailValidation}
        />
        <SelectIsFullTime
          menuPos="absolute"
          type="modal"
          label="Форма навчання"
          required
          isSearchable
          value={formData.isFullTime}
          onChange={(value) => {
            setFormData({ ...formData, isFullTime: value === 'Денна' });
          }}
          placeholder="Форма навчання"
          error={isSubmitted && `${formData.isFullTime}`.length === 0 ? 'Не обрано форму навчання' : ''}
        />
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default StudentsEditModal;

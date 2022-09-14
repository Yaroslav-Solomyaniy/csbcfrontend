import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalInput from '../../../../components/common/ModalInput';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import SelectGroupById from '../../../../components/common/Select/SelectGroupById';
import SelectIsFullTime from '../../../../components/common/Select/SelectIsFullTime';
import { IStudentCreateParams } from '../../../../hooks/useStudents';
import { useStudentsContext } from '../../../../context/students';
import { Email, EmailValidation } from '../../../../types/regExp';
import { useMessagesContext } from '../../../../context/messagesContext';
// styles
import stylesStud from '../../../pagesStyle.module.scss';
import MyDatePicker from '../../../../components/common/datePicker';

interface IGroupCreateModal {
  closeModal: () => void;
  modalActive: boolean;
}

const formInitialData = {
  dateOfBirth: null,
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
  isFullTime: true,
};

const selectValueDefault = {
  group: '',
  isFullTime: 'Денна',
};

export const StudentsCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const { studentCreate } = useStudentsContext();
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<IStudentCreateParams>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectValue, setSelectValue] = useState(selectValueDefault);

  const handleClose = () => {
    setIsSubmitted(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
      setSelectValue(selectValueDefault);
    }, 200);
  };

  useEffect(() => {
    setSelectValue({ ...selectValue, isFullTime: formData.isFullTime ? 'Денна' : 'Заочна' });
  }, [formData.isFullTime]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.dateOfBirth
      && formData.edeboId.toString().length === 8
      && formData.groupId
      && `${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20
      && formData.user.firstName
      && formData.user.lastName
      && formData.user.patronymic
      && Email.test(formData.user.email)
    ) {
      studentCreate?.studentCreate({ ...formData, dateOfBirth: moment(formData.dateOfBirth).format('DD.MM.yyyy') });
    }
  };

  useEffect(() => {
    if (studentCreate?.data) {
      handleClose();
      addInfo(`Студента
    "${formData.user.lastName} ${formData.user.firstName} ${formData.user.patronymic}" успішно додано`);
    }
  }, [studentCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення студента" active={modalActive} closeModal={handleClose}>
      <form className={stylesStud.form} onSubmit={onSubmit}>
        <ModalInput
          required
          label="Прізвище"
          placeholder="Прізвище"
          value={formData.user.lastName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, lastName: event.target.value.slice(0, 20) } });
          }}
          error={isSubmitted && !formData.user.lastName ? 'Прізвище не введено' : ''}
        />
        <ModalInput
          required
          label="Ім`я"
          placeholder="Ім`я"
          value={formData.user.firstName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, firstName: event.target.value.slice(0, 20) } });
          }}
          error={isSubmitted && !formData.user.firstName ? 'Ім`я не введено' : ''}
        />
        <ModalInput
          required
          label="По батькові"
          placeholder="По батькові"
          value={formData.user.patronymic}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, patronymic: event.target.value.slice(0, 20) } });
          }}
          error={isSubmitted && !formData.user.patronymic ? 'По батькові не введено' : ''}
        />

        <MyDatePicker
          label="Дата народження"
          placeholder="Дата народження"
          onChange={(date: Date | null) => setFormData({ ...formData, dateOfBirth: date || null })}
          selected={formData.dateOfBirth !== null ? new Date(formData.dateOfBirth) : undefined}
          showMonthDropdown
          showDisabledMonthNavigation
          maxDate={new Date()}
          minDate={new Date(1970, 1, 1)}
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
        mainButtonText="Створити"
      />
    </ModalWindow>
  );
};

export default StudentsCreateModal;

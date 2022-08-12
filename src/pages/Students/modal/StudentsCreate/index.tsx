import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import { IStudentCreateParams } from '../../../../hooks/useStudents';
import Input from '../../../../components/common/Input';
import { useStudentsContext } from '../../../../context/students';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import SelectGroupById from '../../../../components/common/Select/SelectGroupById';
import { Email, EmailValidation } from '../../../../types/regExp';
import Select from '../../../../components/common/Select';
import { useMessagesContext } from '../../../../context/useMessagesContext';

interface IGroupCreateModal {
  closeModal: () => void;
  modalActive: boolean;
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

const selectValueDefault = {
  group: '',
  isFullTime: '',
};

export const StudentsCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const { studentCreate } = useStudentsContext();
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<IStudentCreateParams>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectValue, setSelectValue] = useState(selectValueDefault);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    setSelectValue(selectValueDefault);
    closeModal();
  };

  useEffect(() => {
    setSelectValue({ ...selectValue, isFullTime: formData.isFullTime ? 'Денна' : 'Заочна' });
  }, [formData.isFullTime]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (
      `${formData.isFullTime}`.length !== 0
      && formData.dateOfBirth
      && `${formData.edeboId}`.length === 8
      && formData.groupId
      && `${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20
      && formData.user.firstName
      && formData.user.lastName
      && formData.user.patronymic
      && Email.test(formData.user.email)
    ) {
      studentCreate?.studentCreate(formData);
    }
  };

  useEffect(() => {
    if (studentCreate?.data) {
      handleClose();
      addInfo(`Студента
    ${formData.user.lastName} ${formData.user.firstName} ${formData.user.patronymic} успішно додано`);
    }
  }, [studentCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення студента" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          required
          label="Прізвище"
          placeholder="Прізвище"
          value={formData.user.lastName.slice(0, 15)}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, lastName: event.target.value } });
          }}
          error={isSubmitted && !formData.user.lastName ? 'Прізвище не введено' : ''}
        />
        <Input
          required
          label="Ім`я"
          placeholder="Ім`я"
          value={formData.user.firstName.slice(0, 10)}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, firstName: event.target.value } });
          }}
          error={isSubmitted && !formData.user.firstName ? 'Ім`я не введено' : ''}
        />
        <Input
          required
          label="По-Батькові"
          placeholder="По-Батькові"
          value={formData.user.patronymic.slice(0, 15)}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, patronymic: event.target.value } });
          }}
          error={isSubmitted && !formData.user.patronymic ? 'По-Батькові не введено' : ''}
        />
        <Input
          inputType="date"
          required
          label="Дата народження"
          placeholder="Дата народження"
          value={formData.dateOfBirth.slice(0, 10)}
          onChange={(event) => {
            setFormData({ ...formData, dateOfBirth: event.target.value });
          }}
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
        />
        <Input
          required
          label="Номер наказу"
          placeholder="Номер наказу"
          value={formData.orderNumber.slice(0, 20)}
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value });
          }}
          error={isSubmitted && (`${formData.orderNumber}`.length < 6
          || `${formData.orderNumber}`.length > 20
            ? 'Номер наказу повинен містити не менше 6-ти символів.' : '')}
        />
        <Input
          required
          label="ЄДЕБО"
          placeholder="ЄДЕБО"
          value={formData.edeboId?.slice(0, 8)}
          onChange={(event) => {
            setFormData({ ...formData, edeboId: event.target.value });
          }}
          error={isSubmitted && (`${formData.edeboId}`.length < 8
            ? 'Номер ЄДЕБО повинен містити не менше 8-ми символів.' : '')}
        />
        <Input
          required
          label="E-Mail"
          placeholder="E-Mail"
          value={formData.user.email?.slice(0, 40)}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, email: event.target.value } });
          }}
          error={isSubmitted && !Email.test(formData.user.email)
            ? (formData.user.email.length < 1 ? 'E-mail не введено' : 'E-mail введено не вірно') : ''}
          pattern={EmailValidation}
        />
        <Select
          type="modal"
          label="Форма навчання"
          required
          isSearchable
          options={[
            { value: 'Денна', label: 'Денна' },
            { value: 'Заочна', label: 'Заочна' },
          ]}
          value={formData.isFullTime ? 'Денна' : 'Заочна'}
          onChange={(value) => {
            setFormData({ ...formData, isFullTime: value === 'Денна' });
          }}
          placeholder="Форма навчання"
          error={isSubmitted && `${formData.isFullTime}`.length === 0 ? 'Оберіть форму навчання' : ''}
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

import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import { IStudents } from '../../../../hooks/useStudents';
import Input from '../../../../components/common/Input';
import { useStudentsContext } from '../../../../context/students';
import SelectGroup from '../../../../components/common/Select/SelectGroupByName';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';

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
  const { createStudents, getOptionsGroups } = useStudentsContext();

  const [formData, setFormData] = useState<IStudents>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectValue, setSelectValue] = useState(selectValueDefault);

  useEffect(() => {
    getOptionsGroups?.getListGroups();
  }, []);

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
      !!formData.dateOfBirth
      && !!formData.groupId
      && !!formData.user.firstName
      && !!formData.user.lastName
      && !!formData.user.patronymic
      && !!formData.user.email
      && `${formData.orderNumber}`.length >= 6
      && `${formData.edeboId}`.length === 8
      && formData.isFullTime !== undefined
    ) {
      createStudents?.addStudent(formData);
      handleClose();
    }
  };

  return (
    <ModalWindow modalTitle="Створення студента" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          required
          label="Прізвище"
          placeholder="Прізвище"
          value={formData.user.lastName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, lastName: event.target.value } });
          }}
          error={isSubmitted && !formData.user.lastName ? 'Прізвище не введено' : ''}
        />
        <Input
          required
          label="Ім`я"
          placeholder="Ім`я"
          value={formData.user.firstName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, firstName: event.target.value } });
          }}
          error={isSubmitted && !formData.user.firstName ? 'Ім`я не введено' : ''}
        />
        <Input
          required
          label="По-Батькові"
          placeholder="По-Батькові"
          value={formData.user.patronymic}
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
          value={formData.dateOfBirth}
          onChange={(event) => {
            setFormData({ ...formData, dateOfBirth: event.target.value });
          }}
          error={isSubmitted && !formData.dateOfBirth ? 'Дату народження не введено' : ''}
        />
        <SelectGroup
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
          value={formData.orderNumber}
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
          value={formData.edeboId}
          onChange={(event) => {
            setFormData({ ...formData, edeboId: event.target.value });
          }}
          error={isSubmitted && (`${formData.edeboId}`.length <= 8
            ? 'Номер ЄДЕБО повинен містити менше 8-ми символів.' : '')}
        />
        <Input
          required
          label="E-Mail"
          placeholder="E-Mail"
          value={formData.user.email}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, email: event.target.value } });
          }}
          error={isSubmitted && !formData.user.email ? 'E-Mail не введено' : ''}
        />
        {/* <Select
          type="modal"
          label="Форма навчання"
          required
          isSearchable
          isClearable
          options={[
            { value: 'Денна', label: 'Денна' },
            { value: 'Заочна', label: 'Заочна' },
          ]}
          value={formData.isFullTime ? 'Денна' : formData.isFullTime === undefined ? '' : 'Заочна'}
          onChange={(value) => {
            setFormData({ ...formData, isFullTime: value === 'Денна' ? true : value === 'Заочна' ? false : undefined });
          }}
          placeholder="Форма навчання"
          error={isSubmitted && formData.isFullTime === undefined ? 'Оберіть форму навчання' : ''}
        /> */}
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

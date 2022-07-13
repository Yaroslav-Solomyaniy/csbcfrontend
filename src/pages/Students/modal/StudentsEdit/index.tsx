import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';

import { useStudentsContext } from '../../../../context/students';
import SelectGroup from '../../../../components/common/SelectGroup';
import Select from '../../../../components/common/Select';
import ModalWindow from '../../../../components/common/ModalWindow';
import Input from '../../../../components/common/Input';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { IStudents } from '../../../../hooks/useStudents';

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
  isFullTime: true,
};

export const StudentsEditModal = ({ modalActive, closeModal, id }: IGroupCreateModal): JSX.Element => {
  const { patchStudentsItem, getStudent } = useStudentsContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IStudents>(formInitialData);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);

    if (
      formData.dateOfBirth
      && formData.groupId
      && formData.user.firstName
      && formData.user.lastName
      && formData.user.patronymic
      && formData.user.email
      && formData.orderNumber
      && formData.edeboId
      && formData.isFullTime
    ) {
      patchStudentsItem?.patchStudent({ ...formData }, id);
      handleClose();
    }
  };

  useEffect(() => {
    if (id) {
      getStudent?.getStudent({ id: `${id}` });
    }
  }, [id]);

  useEffect(() => {
    if (getStudent?.data) {
      setFormData({
        dateOfBirth: getStudent.data.dateOfBirth,
        groupId: getStudent.data.group.id,
        user: {
          firstName: getStudent.data.user.firstName,
          lastName: getStudent.data.user.lastName,
          patronymic: getStudent.data.user.patronymic,
          email: getStudent.data.user.email,
          role: 'student',
        },
        orderNumber: getStudent.data.orderNumber,
        edeboId: getStudent.data.edeboId,
        isFullTime: getStudent.data.isFullTime,
      });
    }
  }, [getStudent?.data]);

  return (
    <ModalWindow modalTitle="Редагування групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          required
          label="Прізвище"
          placeholder="Прізвище"
          value={formData.user.lastName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, lastName: event.target.value } });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="Ім'я"
          placeholder="Ім'я"
          value={formData.user.firstName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, firstName: event.target.value } });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="По-Батькові"
          placeholder="По-Батькові"
          value={formData.user.patronymic}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, patronymic: event.target.value } });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="Дата народження"
          placeholder="Дата народження"
          value={formData.dateOfBirth}
          onChange={(event) => {
            setFormData({ ...formData, dateOfBirth: event.target.value });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <SelectGroup
          type="modal"
          label="Група"
          placeholder="Група"
          value={formData.groupId}
          onChange={(value: string) => {
            setFormData({ ...formData, groupId: +value });
          }}
          isClearable
          isSearchable
        />
        <Input
          required
          label="Номер наказу"
          placeholder="Номер наказу"
          value={formData.orderNumber}
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="ЄДЕБО"
          placeholder="ЄДЕБО"
          value={formData.edeboId}
          onChange={(event) => {
            setFormData({ ...formData, edeboId: event.target.value });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="E-Mail"
          placeholder="E-Mail"
          value={formData.user.email}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, email: event.target.value } });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Select
          type="modal"
          label="форма навчання"
          required
          isSearchable
          isClearable
          options={[
            { value: true, label: 'Денна' },
            { value: false, label: 'Заочна' },
          ]}
          value={formData.isFullTime ? 'Денна' : 'Заочна'}
          onChange={(value) => {
            console.log(value);
            setFormData({ ...formData, isFullTime: value === 'Денна' });
          }}
          placeholder="Оберіть форму навчання"
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
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

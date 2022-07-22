import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';

import { useStudentsContext } from '../../../../context/students';
import SelectGroup from '../../../../components/common/Select/SelectGroupByName';
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
  isFullTime: undefined,
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
    const query: IStudents = { user: {} };

    e?.preventDefault?.();
    setIsSubmitted(true);

    if (formData.dateOfBirth !== getStudent?.data?.dateOfBirth) query.dateOfBirth = formData.dateOfBirth;
    if (formData.groupId !== getStudent?.data?.group.id) query.groupId = formData.groupId;
    if (formData.user.firstName !== getStudent?.data?.user.firstName) query.user.firstName = formData.user.firstName;
    if (formData.user.lastName !== getStudent?.data?.user.lastName) query.user.lastName = formData.user.lastName;
    if (formData.user.patronymic !== getStudent?.data?.user.patronymic) {
      query.user.patronymic = formData.user.patronymic;
    }
    if (formData.user.email !== getStudent?.data?.user.email) query.user.email = formData.user.email;
    if (formData.orderNumber !== getStudent?.data?.orderNumber) query.orderNumber = formData.orderNumber;
    if (formData.edeboId !== getStudent?.data?.edeboId) query.edeboId = formData.edeboId;
    if (formData.isFullTime !== getStudent?.data?.isFullTime) query.isFullTime = formData.isFullTime;

    patchStudentsItem?.patchStudent(query, id);
    handleClose();
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
    <ModalWindow modalTitle="Редагування студента" active={modalActive} closeModal={handleClose}>
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
        <Select
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

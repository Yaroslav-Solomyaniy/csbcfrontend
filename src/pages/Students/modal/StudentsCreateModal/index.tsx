import React, { useState } from 'react';
import styles from './index.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import { IAddStudents } from '../../../../hooks/useStudents';
import Select from '../../../../components/common/Select';
import Input from '../../../../components/common/Input';

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
    role: '',
  },
  orderNumber: '',
  edeboId: '',
  isFullTime: true,
};

export const StudentsCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const [formData, setFormData] = useState<IAddStudents>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    // тут буде запрос
  };

  return (
    <ModalWindow modalTitle="Додавання студента" active={modalActive} closeModal={closeModal}>
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
        <Select
          type="modal"
          label="Група"
          options={[
            {
              value: '1Д-08',
              label: '1Д-08',
            },
          ]}
          value={formData.groupId}
          onChange={(value: string) => {
            setFormData({ ...formData, groupId: +value });
          }}
          placeholder="Оберіть групу"
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
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
            { value: 'true', label: 'true' },
            { value: 'false', label: 'false' },
          ]}
          value={`${formData.isFullTime}`}
          onChange={(value) => {
            setFormData({ ...formData, isFullTime: value === 'true' });
          }}
          placeholder="Оберіть форму навчання"
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
      </form>
      <div className={styles.modal__buttons}>
        <button
          type="button"
          className={styles.modal_revert}
          onClick={closeModal}
        >
          Відміна
        </button>
        <button
          type="button"
          className={styles.modal_submit}
          onClick={onSubmit}
        >
          Створити
        </button>
      </div>
    </ModalWindow>
  );
};

export default StudentsCreateModal;

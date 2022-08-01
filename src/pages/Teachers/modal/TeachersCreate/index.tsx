import React, { useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import styles from '../index.module.scss';
import Input from '../../../../components/common/Input';
import MultiSelectCourses from '../../../../components/common/MultiSelect/MultiSelectCourses';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
}

interface IFormInitialData {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  courses: string[];
}

const formInitialData: IFormInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  courses: [],
};

export const StudentsDeleteModal = ({ modalActive, closeModal }: IStudentsDeleteModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(formInitialData);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);

    if (
      !!formData.firstName
      && !!formData.lastName
      && !!formData.patronymic
      && !!formData.email
    ) {
      handleClose();
    }
  };

  return (
    <ModalWindow modalTitle="Створення викладача" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          label="Прізвище"
          placeholder="Прізвище"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
        />
        <Input
          label="Ім`я"
          placeholder="Ім`я"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          error={isSubmitted && !formData.firstName ? 'Ім`я не введено' : ''}
        />
        <Input
          label="По-Батькові"
          placeholder="По-Батькові"
          required
          value={formData.patronymic}
          onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
          error={isSubmitted && !formData.patronymic ? 'По-Батькові не введено' : ''}
        />
        <Input
          label="E-Mail"
          placeholder="E-Mail"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={isSubmitted && !formData.email ? 'E-Mail не введено' : ''}
        />
        <MultiSelectCourses
          type="modal"
          label="Предмети"
          placeholder="Предмети"
          required
          value={formData.courses}
          onChange={(value) => setFormData({
            ...formData,
            courses: value.map((option) => `${option.value}`),
          })}
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

export default StudentsDeleteModal;

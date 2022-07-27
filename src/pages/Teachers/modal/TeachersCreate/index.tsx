import React, { useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import styles from '../index.module.scss';
import SelectCourse from '../../../../components/common/Select/SelectCourse';
import Input from '../../../../components/common/Input';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
}

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  course: '',

};

const selectValueDefault = {
  course: '',
};

export const StudentsDeleteModal = ({ modalActive, closeModal }: IStudentsDeleteModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(formInitialData);
  const [selectValue, setSelectValue] = useState(selectValueDefault);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    setSelectValue(selectValueDefault);
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
    <ModalWindow modalTitle="Створення студента" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          required
          label="Прізвище"
          placeholder="Прізвище"
          value={formData.lastName}
          onChange={() => undefined}
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
        />
        <Input
          label="Ім`я"
          placeholder="Ім`я"
          required
          value={formData.firstName}
          onChange={() => undefined}
          error={isSubmitted && !formData.firstName ? 'Ім`я не введено' : ''}
        />
        <Input
          label="По-Батькові"
          placeholder="По-Батькові"
          required
          value={formData.patronymic}
          onChange={() => undefined}
          error={isSubmitted && !formData.patronymic ? 'По-Батькові не введено' : ''}
        />
        <Input
          required
          label="E-Mail"
          placeholder="E-Mail"
          value={formData.email}
          onChange={() => undefined}
          error={isSubmitted && !formData.email ? 'E-Mail не введено' : ''}
        />
        <SelectCourse
          type="modal"
          label="Предмети"
          placeholder="Предмети"
          required
          onChange={() => undefined}
          value={selectValue.course}
        />
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Видалити"
      />
    </ModalWindow>
  );
};

export default StudentsDeleteModal;

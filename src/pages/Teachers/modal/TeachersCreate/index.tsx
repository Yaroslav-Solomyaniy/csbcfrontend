import React, { useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import pagesStyle from '../../../pagesStyle.module.scss';
import ModalInput from '../../../../components/common/ModalInput';
import { useTeachersContext } from '../../../../context/teachers';
import { ITeacherCreateParams } from '../../../../hooks/useTeachers';
import { Email, EmailValidation } from '../../../../types/regExp';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
}

const formInitialData: ITeacherCreateParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'teacher',
};

export const StudentsDeleteModal = ({ modalActive, closeModal }: IStudentsDeleteModal): JSX.Element => {
  const { createTeacher } = useTeachersContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ITeacherCreateParams>(formInitialData);

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
      createTeacher?.createTeacher(formData);
    }
  };

  return (
    <ModalWindow modalTitle="Створення викладача" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <ModalInput
          label="Прізвище"
          placeholder="Прізвище"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value.slice(0, 20) })}
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
        />
        <ModalInput
          label="Ім`я"
          placeholder="Ім`я"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value.slice(0, 15) })}
          error={isSubmitted && !formData.firstName ? 'Ім`я не введено' : ''}
        />
        <ModalInput
          label="По батькові"
          placeholder="По батькові"
          required
          value={formData.patronymic}
          onChange={(e) => setFormData({ ...formData, patronymic: e.target.value.slice(0, 20) })}
          error={isSubmitted && !formData.patronymic ? 'По батькові не введено' : ''}
        />
        <ModalInput
          label="Електронна пошта"
          placeholder="Електронна пошта"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value.slice(0, 40) })}
          error={isSubmitted && !Email.test(formData.email)
            ? (formData.email.length < 1 ? 'Електронну пошту не введено' : 'Електронна пошта введено не вірно') : ''}
          pattern={EmailValidation}
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

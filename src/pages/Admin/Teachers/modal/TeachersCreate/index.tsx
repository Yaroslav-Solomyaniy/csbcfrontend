import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import pagesStyle from '../../../../pagesStyle.module.scss';
import ModalInput from '../../../../../components/common/MyInput';
import { TeachersContext } from '../../../../../context/PagesInAdmin/Teachers';
import { Email, EmailValidation } from '../../../../../types/regExp';
import { IUserCreateParams } from '../../../../../hooks/All/useUser';
import { ICreateModal } from '../../../../../types';
import { MessagesContext } from '../../../../../context/All/Messages';

const formInitialData: IUserCreateParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'teacher',
};

export const TeacherCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const { teacherCreate } = TeachersContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IUserCreateParams>(formInitialData);
  const { addInfo } = MessagesContext();

  const handleClose = () => {
    setIsSubmitted(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);

    if (formData.firstName && formData.lastName && formData.patronymic && Email.test(formData.email)) {
      teacherCreate?.createUser(formData);
    }
  };

  useEffect(() => {
    if (teacherCreate?.data) {
      handleClose();
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic} доданий у список`);
    }
  }, [teacherCreate?.data]);

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

export default TeacherCreateModal;

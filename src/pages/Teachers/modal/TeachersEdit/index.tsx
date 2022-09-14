import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import pagesStyle from '../../../pagesStyle.module.scss';
import ModalInput from '../../../../components/common/ModalInput';
import { useTeachersContext } from '../../../../context/teachers';
import { Email, EmailValidation } from '../../../../types/regExp';
import { IEditModal } from '../../../../types';
import { IUserEditParams } from '../../../../hooks/useUser';
import { useMessagesContext } from '../../../../context/messagesContext';

const formInitialData: IUserEditParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
};

export const TeacherEditModal = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const { teacherEdit, getTeacherById } = useTeachersContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IUserEditParams>(formInitialData);
  const { addInfo } = useMessagesContext();

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

    if (formData.firstName
      && formData.lastName
      && formData.patronymic
      && formData.lastName
      && Email.test(formData.email)) {
      teacherEdit?.userEdit({ ...formData }, studentId);
    }
  };

  useEffect(() => {
    if (teacherEdit?.data) {
      handleClose();
      addInfo(`Викладач "${formData.lastName} ${formData.firstName} ${formData.patronymic}" відредагований`);
    }
  }, [teacherEdit?.data]);

  useEffect(() => {
    if (studentId) {
      getTeacherById?.getUserId({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getTeacherById?.data) {
      setFormData({
        firstName: getTeacherById.data.firstName,
        lastName: getTeacherById.data.lastName,
        patronymic: getTeacherById.data.patronymic,
        email: getTeacherById.data.email,
      });
    }
  }, [getTeacherById?.data]);

  return (
    <ModalWindow modalTitle="Редагуваня викладача" active={modalActive} closeModal={handleClose}>
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
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default TeacherEditModal;

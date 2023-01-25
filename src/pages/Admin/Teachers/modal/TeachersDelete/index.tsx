import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import pagesStyle from '../../../../pagesStyle.module.scss';
import { TeachersContext } from '../../../../../context/Pages/admin/Teachers';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IDeleteModal } from '../../../../../types';

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
};

export const TeachersDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const { getTeacherById, deleteTeacher } = TeachersContext();
  const [formData, setFormData] = useState(formInitialData);
  const { addInfo } = MessagesContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    deleteTeacher?.deleteUser(Id);
  };

  useEffect(() => {
    if (deleteTeacher?.data) {
      closeModal();
      addInfo(`Викладач "${formData.lastName} ${formData.firstName} ${formData.patronymic}" видалений`);
    }
  }, [deleteTeacher?.data]);

  useEffect(() => {
    if (Id) {
      getTeacherById?.getUserById({ id: `${Id}` });
    }
  }, [Id]);

  useEffect(() => {
    if (getTeacherById?.data) {
      setFormData({
        firstName: getTeacherById?.data.firstName,
        lastName: getTeacherById?.data.lastName,
        patronymic: getTeacherById?.data.patronymic,
      });
    }
  }, [getTeacherById?.data]);

  return (
    <ModalWindow modalTitle="Видалення викладача" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <h3 className={pagesStyle.subtitle}>
          {' '}
          Ви дійсно бажаєте видалити викладача
          `
          {formData.lastName}
          {' '}
          {formData.firstName}
          {' '}
          {formData.patronymic}
          `?
          {' '}
        </h3>
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

export default TeachersDeleteModal;

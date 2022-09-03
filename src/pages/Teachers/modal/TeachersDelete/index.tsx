import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import pagesStyle from '../../../pagesStyle.module.scss';
import { useTeachersContext } from '../../../../context/teachers';
import { useMessagesContext } from '../../../../context/useMessagesContext';
import { IDeleteModal } from '../../../../types';

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
};

export const TeachersDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const { getTeacherById, teacherDelete } = useTeachersContext();
  const [formData, setFormData] = useState(formInitialData);
  const { addInfo } = useMessagesContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    teacherDelete?.userDelete(Id);
  };

  useEffect(() => {
    if (teacherDelete?.data) {
      closeModal();
      addInfo(`Викладач "${formData.lastName} ${formData.firstName} ${formData.patronymic}" видалений`);
    }
  }, [teacherDelete?.data]);

  useEffect(() => {
    if (Id) {
      getTeacherById?.getUserId({ id: `${Id}` });
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

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { StudentsContext } from '../../../../../context/Pages/admin/Students';
import { Email } from '../../../../../types/regExp';
import { MessagesContext } from '../../../../../context/All/Messages';
import CreateOrEditStudentsForm from '../form/CreateOrEdit';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { ICreateStudentParams } from '../../../../../hooks/api/admin/students/interfaces/ICreateStudentParams';

interface IGroupCreateModal {
  closeModal: () => void;
  modalActive: boolean;
}

const formInitialData = {
  dateOfBirth: null,
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

export const StudentsCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const { createStudent } = StudentsContext();
  const { addInfo } = MessagesContext();
  const [formData, setFormData] = useState<ICreateStudentParams>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    if (formData.dateOfBirth
      && formData.edeboId.toString().length === 8
      && formData.groupId
      && `${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20
      && formData.user.firstName
      && formData.user.lastName
      && formData.user.patronymic
      && Email.test(formData.user.email)
    ) {
      createStudent?.createStudent({ ...formData,
        dateOfBirth: moment(formData.dateOfBirth).format('DD.MM.yyyy'),
        isFullTime: formData.isFullTime === true });
    }
  };

  useEffect(() => {
    if (createStudent?.data) {
      handleClose();
      addInfo(`Студента
    "${formData.user.lastName} ${formData.user.firstName} ${formData.user.patronymic}" успішно додано`);
    }
  }, [createStudent?.data]);

  return (
    <ModalWindow modalTitle="Створення студента" active={modalActive} closeModal={handleClose}>
      <CreateOrEditStudentsForm
        isSubmitted={isSubmitted}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
      />
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Створити"
      />
    </ModalWindow>
  );
};

export default StudentsCreateModal;

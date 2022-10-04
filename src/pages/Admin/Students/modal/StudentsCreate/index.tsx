import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IStudentCreateParams } from '../../../../../hooks/PagesInAdmin/useStudents';
import { StudentsContext } from '../../../../../context/PagesInAdmin/Students';
import { Email } from '../../../../../types/regExp';
import { MessagesContext } from '../../../../../context/All/Messages';
import CreateOrEditStudentsForm from '../form/CreateOrEdit';

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
  const { studentCreate } = StudentsContext();
  const { addInfo } = MessagesContext();
  const [formData, setFormData] = useState<IStudentCreateParams>(formInitialData);
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
      studentCreate?.studentCreate({ ...formData,
        dateOfBirth: moment(formData.dateOfBirth).format('DD.MM.yyyy'),
        isFullTime: formData.isFullTime === 'true' });
    }
  };

  useEffect(() => {
    if (studentCreate?.data) {
      handleClose();
      addInfo(`Студента
    "${formData.user.lastName} ${formData.user.firstName} ${formData.user.patronymic}" успішно додано`);
    }
  }, [studentCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення студента" active={modalActive} closeModal={handleClose}>
      <CreateOrEditStudentsForm
        handleClose={handleClose}
        isSubmitted={isSubmitted}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
      />
    </ModalWindow>
  );
};

export default StudentsCreateModal;

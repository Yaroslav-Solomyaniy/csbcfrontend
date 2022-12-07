import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { StudentsContext } from '../../../../../context/Pages/admin/Students';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { Email } from '../../../../../types/regExp';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IEditModal } from '../../../../../types';
import CreateOrEditStudentsForm from '../form/CreateOrEdit';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { ICreateStudentParams } from '../../../../../hooks/api/admin/students/interfaces/ICreateStudentParams';

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
  isFullTime: undefined,
};

export const StudentsEditModal = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const { editStudent, getStudentById } = StudentsContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICreateStudentParams>(formInitialData);
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

    if (formData.dateOfBirth
      && formData.edeboId.length === 8
      && `${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20
      && formData.user.firstName
      && formData.user.lastName
      && formData.user.patronymic
      && Email.test(formData.user.email)
    ) {
      editStudent?.editStudent({
        ...formData,
        dateOfBirth: moment(formData.dateOfBirth).format('DD.MM.yyyy'),
        isFullTime: formData.isFullTime === 'true',
      }, studentId);
    }
  };

  useEffect(() => {
    if (studentId) {
      getStudentById?.getStudentById({ id: studentId });
    }
  }, [studentId]);

  useEffect(() => {
    if (editStudent?.data) {
      handleClose();
      addInfo(`Студента
    "${formData.user.lastName} ${formData.user.firstName} ${formData.user.patronymic}" успішно відредаговано`);
    }
  }, [editStudent?.data]);

  useEffect(() => {
    if (getStudentById?.data) {
      const data = {
        dateOfBirth: moment(getStudentById.data.dateOfBirth, 'DD.MM.yyyy').toDate(),
        groupId: getStudentById.data.group.id,
        user: {
          firstName: getStudentById.data.user.firstName,
          lastName: getStudentById.data.user.lastName,
          patronymic: getStudentById.data.user.patronymic,
          email: getStudentById.data.user.email,
          role: 'student',
        },
        orderNumber: getStudentById.data.orderNumber,
        edeboId: getStudentById.data.edeboId,
        isFullTime: getStudentById.data.isFullTime,
      };

      setFormData(data);
    }
  }, [getStudentById?.data]);

  return (
    <ModalWindow modalTitle="Редагування студента" active={modalActive} closeModal={handleClose}>
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
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default StudentsEditModal;

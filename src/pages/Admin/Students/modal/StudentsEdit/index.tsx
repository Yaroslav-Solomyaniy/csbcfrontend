import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useStudentsContext } from '../../../../../context/students';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IStudentCreateParams } from '../../../../../hooks/useStudents';
import { Email } from '../../../../../types/regExp';
import { useMessagesContext } from '../../../../../context/messagesContext';
import { IEditModal } from '../../../../../types';
import CreateOrEditStudentsForm from '../form/CreateOrEdit';
import MobileModalWindow from '../../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../../context/TypeDevice';

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
  const { studentEdit, getStudentById } = useStudentsContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IStudentCreateParams>(formInitialData);
  const { addInfo } = useMessagesContext();
  const { isPhone, isDesktop, isTablet } = useDeviceContext();

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
      studentEdit?.studentEdit({ ...formData,
        dateOfBirth: moment(formData.dateOfBirth).format('DD.MM.yyyy'),
        isFullTime: formData.isFullTime === 'true' }, studentId);
    }
  };

  useEffect(() => {
    if (studentId) {
      getStudentById?.getStudentId({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (studentEdit?.data) {
      handleClose();
      addInfo(`Студента
    "${formData.user.lastName} ${formData.user.firstName} ${formData.user.patronymic}" успішно відредаговано`);
    }
  }, [studentEdit?.data]);

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
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Редагування студента" active={modalActive} closeModal={handleClose}>
          <CreateOrEditStudentsForm
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <CreateOrEditStudentsForm
            modalTitle="Редагування студента"
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default StudentsEditModal;

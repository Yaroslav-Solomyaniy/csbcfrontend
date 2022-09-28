import React, { useEffect } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import { useStudentsContext } from '../../../../context/students';
import { useMessagesContext } from '../../../../context/messagesContext';
import MobileModalWindow from '../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../context/TypeDevice';
import StudentsDeleteForm from '../form/DeleteForm';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
  studentId: number;
}

export const StudentsDeleteModal = ({ modalActive, closeModal, studentId }: IStudentsDeleteModal): JSX.Element => {
  const { studentDelete, getStudentById } = useStudentsContext();
  const { addInfo } = useMessagesContext();
  const { isTablet, isPhone, isDesktop } = useDeviceContext();

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    studentDelete?.studentDelete(studentId);
  };

  useEffect(() => {
    if (studentDelete?.data) {
      closeModal();
      addInfo(`Студента "${getStudentById?.data?.user.lastName}
      ${getStudentById?.data?.user.firstName} ${getStudentById?.data?.user.patronymic}" успішно видалено`);
    }
  }, [studentDelete?.data]);

  useEffect(() => {
    if (studentId) {
      getStudentById?.getStudentId({ id: `${studentId}` });
    }
  }, [studentId]);

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Видалення студента" active={modalActive} closeModal={closeModal}>
          <StudentsDeleteForm
            onSubmit={onSubmit}
            student={`${getStudentById?.data?.user.lastName} 
            ${getStudentById?.data?.user.firstName} ${getStudentById?.data?.user.patronymic}`}
            handleClose={closeModal}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <StudentsDeleteForm
            modalTitle="Видалення студента"
            onSubmit={onSubmit}
            student={`${getStudentById?.data?.user.lastName} 
            ${getStudentById?.data?.user.firstName} ${getStudentById?.data?.user.patronymic}`}
            handleClose={closeModal}
          />

        </MobileModalWindow>
      )}
    </>
  );
};

export default StudentsDeleteModal;

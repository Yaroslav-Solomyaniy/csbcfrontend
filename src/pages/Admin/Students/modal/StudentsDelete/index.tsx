import React, { useEffect } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { StudentsContext } from '../../../../../context/PagesInAdmin/Students';
import { MessagesContext } from '../../../../../context/All/Messages';
import StudentsDeleteForm from '../form/DeleteForm';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
  studentId: number;
}

export const StudentsDeleteModal = ({ modalActive, closeModal, studentId }: IStudentsDeleteModal): JSX.Element => {
  const { studentDelete, getStudentById } = StudentsContext();
  const { addInfo } = MessagesContext();

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
    <ModalWindow modalTitle="Видалення студента" active={modalActive} closeModal={closeModal}>
      <StudentsDeleteForm
        onSubmit={onSubmit}
        student={`${getStudentById?.data?.user.lastName} 
            ${getStudentById?.data?.user.firstName} ${getStudentById?.data?.user.patronymic}`}
        handleClose={closeModal}
      />
    </ModalWindow>
  );
};

export default StudentsDeleteModal;

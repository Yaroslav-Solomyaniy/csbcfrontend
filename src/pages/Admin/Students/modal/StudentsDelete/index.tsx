import React, { useEffect } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { StudentsContext } from '../../../../../context/Pages/admin/Students';
import { MessagesContext } from '../../../../../context/All/Messages';
import styles from '../../../../pagesStyle.module.scss';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
  studentId: number;
}

export const StudentsDeleteModal = ({ modalActive, closeModal, studentId }: IStudentsDeleteModal): JSX.Element => {
  const { deleteStudent, getStudentById } = StudentsContext();
  const { addInfo } = MessagesContext();

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    deleteStudent?.deleteStudent(studentId);
  };

  useEffect(() => {
    if (deleteStudent?.data) {
      closeModal();
      addInfo(`Студента "${getStudentById?.data?.user.lastName}
      ${getStudentById?.data?.user.firstName} ${getStudentById?.data?.user.patronymic}" успішно видалено`);
    }
  }, [deleteStudent?.data]);

  useEffect(() => {
    if (studentId) {
      getStudentById?.getStudentById({ id: studentId });
    }
  }, [studentId]);

  return (
    <ModalWindow modalTitle="Видалення студента" active={modalActive} closeModal={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.subtitle}>
          {`Ви дійсно бажаєте видалити студента: "${getStudentById?.data?.user.lastName}
         ${getStudentById?.data?.user.firstName} ${getStudentById?.data?.user.patronymic}" ?`}
        </h3>
      </form>
      <ModalControlButtons
        handleClose={closeModal}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Видалити"
      />
    </ModalWindow>
  );
};

export default StudentsDeleteModal;

import React, { useEffect } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { StudentsContext } from '../../../../../context/PagesInAdmin/Students';
import { MessagesContext } from '../../../../../context/All/Messages';
import styles from '../../../../pagesStyle.module.scss';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

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
      getStudentById?.getStudentId({ id: studentId });
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

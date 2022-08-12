import React, { useEffect } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import pagesStyle from '../../../pagesStyle.module.scss';
import { useTeachersContext } from '../../../../context/teachers';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
  id: number;
}

export const StudentsDeleteModal = ({ modalActive, closeModal, id }: IStudentsDeleteModal): JSX.Element => {
  const { deleteTeacher, getTeacher } = useTeachersContext();

  const handleClose = () => {
    getTeacher?.getTeacher({ groups: [], courses: [] });
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    deleteTeacher?.userDelete(id);
  };

  useEffect(() => {
    handleClose();
  }, [deleteTeacher?.data]);

  useEffect(() => {
    if (id) {
      getTeacher?.getTeacher({ teacherId: id, groups: [], courses: [] });
    }
  }, [id]);

  return (
    <ModalWindow modalTitle="Видалення викладача" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <h3 className={pagesStyle.subtitle}>
          Ви дійсно бажаєте видалити викладача
          {`
            ${getTeacher?.data?.items[0].lastName}
            ${getTeacher?.data?.items[0].firstName}
            ${getTeacher?.data?.items[0].patronymic}
          `}
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

export default StudentsDeleteModal;

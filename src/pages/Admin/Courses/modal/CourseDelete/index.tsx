import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../../context/All/Messages';
import { CoursesContext } from '../../../../../context/Pages/admin/Courses';
import { IDeleteModal } from '../../../../../types';
import styles from '../../../../pagesStyle.module.scss';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

export const CourseDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [courseName, setCourseName] = useState<string>();
  const { deleteCourse, getCourseById } = CoursesContext();
  const { addInfo } = MessagesContext();

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    deleteCourse?.deleteCourse(Id);
  };

  useEffect(() => {
    if (deleteCourse?.data) {
      closeModal();
      addInfo(`Предмет "${getCourseById?.data?.name}" успішно видалено`);
    }
  }, [deleteCourse?.data]);

  useEffect(() => {
    if (getCourseById?.data) {
      setCourseName(getCourseById.data.name);
    }
  }, [getCourseById?.data]);

  useEffect(() => {
    if (Id) {
      getCourseById?.getCourseById({ id: `${Id}` });
    }
  }, [Id]);

  return (
    <ModalWindow modalTitle="Видалення предмету" active={modalActive} closeModal={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.subtitle}>{`Ви дійсно бажаєте видалити предмет "${courseName}" ?`}</h3>
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

export default CourseDeleteModal;

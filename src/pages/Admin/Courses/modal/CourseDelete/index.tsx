import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../../context/All/Messages';
import { CoursesContext } from '../../../../../context/PagesInAdmin/Courses';
import { IDeleteModal } from '../../../../../types';
import styles from '../../../../pagesStyle.module.scss';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

export const CourseDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [courseName, setCourseName] = useState<string>();
  const { courseDelete, getCourseId } = CoursesContext();
  const { addInfo } = MessagesContext();

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    courseDelete?.courseDelete(Id);
  };

  useEffect(() => {
    if (courseDelete?.data) {
      closeModal();
      addInfo(`Предмет "${getCourseId?.data?.name}" успішно видалено`);
    }
  }, [courseDelete?.data]);

  useEffect(() => {
    if (getCourseId?.data) {
      setCourseName(getCourseId.data.name);
    }
  }, [getCourseId?.data]);

  useEffect(() => {
    if (Id) {
      getCourseId?.getCourseId({ id: `${Id}` });
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

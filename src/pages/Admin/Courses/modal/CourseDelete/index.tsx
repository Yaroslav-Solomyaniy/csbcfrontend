import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../../context/All/Messages';
import { CoursesContext } from '../../../../../context/PagesInAdmin/Courses';
import { IDeleteModal } from '../../../../../types';
import { DeviceContext } from '../../../../../context/All/DeviceType';
import CourseDeleteForm from '../form/Delete';

export const CourseDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [courseName, setCourseName] = useState<string>();
  const { courseDelete, getCourseId } = CoursesContext();
  const { addInfo } = MessagesContext();
  const { isTablet, isPhone, isDesktop } = DeviceContext();

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
      <CourseDeleteForm
        handleClose={closeModal}
        courseName={courseName}
        onSubmit={onSubmit}
      />
    </ModalWindow>

  );
};

export default CourseDeleteModal;

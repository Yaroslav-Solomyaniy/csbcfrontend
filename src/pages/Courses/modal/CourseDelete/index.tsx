import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import { useMessagesContext } from '../../../../context/messagesContext';
import { useCourseContext } from '../../../../context/courses';
import { IDeleteModal } from '../../../../types';
import MobileModalWindow from '../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../context/TypeDevice';
import CourseDeleteForm from '../form/Delete';

export const CourseDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [courseName, setCourseName] = useState<string>();
  const { courseDelete, getCourseId } = useCourseContext();
  const { addInfo } = useMessagesContext();
  const { isTablet, isPhone, isDesktop } = useDeviceContext();

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
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Видалення предмету" active={modalActive} closeModal={closeModal}>
          <CourseDeleteForm
            handleClose={closeModal}
            courseName={courseName}
            onSubmit={onSubmit}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <CourseDeleteForm
            modalTitle="Видалення предмету"
            handleClose={closeModal}
            courseName={courseName}
            onSubmit={onSubmit}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default CourseDeleteModal;

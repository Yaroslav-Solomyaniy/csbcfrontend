import React, { useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import clsx from 'clsx';
import styles from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { useMessagesContext } from '../../../context/messagesContext';
import { IEditModal } from '../../../types';
import { useTeacherPageContext } from '../../../context/pageTeacher';
import { useDeviceContext } from '../../../context/TypeDevice';
import RatingEditForm from './RatingEditForm';

export interface typeFormData {
  courseId: number;
  grade: number;
  reasonForChange: string;
}

const formInitialData: typeFormData = {
  courseId: 0,
  grade: 0,
  reasonForChange: 'Екзамен',
};

export interface typeInfoRow{
  firstName: string;
  lastName: string;
  userId: number;
  patronymic: string;
  courseName: string;
  groupName: string;
  grade: number;
}
const infoRowInitialization: typeInfoRow = {
  firstName: '',
  userId: 0,
  lastName: '',
  patronymic: '',
  courseName: '',
  groupName: '',
  grade: 0,
};

export const TeacherRatingEdit = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const { teacherDataGetById, teacherEditRating } = useTeacherPageContext();
  const { addInfo } = useMessagesContext();
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  const [formData, setFormData] = useState<typeFormData>(formInitialData);
  const [isSubmitted, setIsSubmited] = useState(false);
  const [infoRow, setInfoRow] = useState<typeInfoRow>(infoRowInitialization);

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
    if (formData.courseId && formData.grade && formData.reasonForChange) {
      teacherEditRating?.teacherPageEditRating(formData, infoRow.userId);
    }
  };

  useEffect(() => {
    if (teacherEditRating?.data) {
      handleClose();
      addInfo('Оцінку успішно змінено');
    }
  }, [teacherEditRating?.data]);

  useEffect(() => {
    setInfoRow({ firstName: teacherDataGetById?.data?.student.user.firstName || '',
      patronymic: teacherDataGetById?.data?.student.user.patronymic || '',
      lastName: teacherDataGetById?.data?.student.user.lastName || '',
      courseName: teacherDataGetById?.data?.course.name || '',
      groupName: teacherDataGetById?.data?.student.group.name || '',
      grade: teacherDataGetById?.data?.grade || 0,
      userId: teacherDataGetById?.data?.student.id || 0,
    });
    setFormData({ ...formData, courseId: teacherDataGetById?.data?.course.id || 0 });
  }, [
    teacherDataGetById?.data,
  ]);

  useEffect(() => {
    if (studentId) {
      teacherDataGetById?.pageTeacherGetById(studentId);
    }
  }, [studentId]);

  return (
    <>
      {isDesktop && (
      <ModalWindow modalTitle="Редагування оцінки" active={modalActive} closeModal={closeModal}>
        <RatingEditForm
          closeModal={handleClose}
          onSubmit={onSubmit}
          isSubmitted={isSubmitted}
          formData={formData}
          infoRow={infoRow}
          setFormData={setFormData}
        />
      </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <div className={clsx(styles.newModal, modalActive && styles.newModal_active)}>
          { modalActive ? disableBodyScroll(document.body) : enableBodyScroll(document.body) }
          <RatingEditForm
            modalTitle="Редагування оцінки"
            closeModal={handleClose}
            onSubmit={onSubmit}
            isSubmitted={isSubmitted}
            formData={formData}
            infoRow={infoRow}
            setFormData={setFormData}
          />
        </div>
      )}
    </>
  );
};

export default TeacherRatingEdit;

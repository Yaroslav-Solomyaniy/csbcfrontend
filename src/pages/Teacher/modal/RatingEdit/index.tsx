import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../context/All/Messages';
import { IEditModal } from '../../../../types';
import { TeacherContext } from '../../../../context/PageInTeacher/Teacher';
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

export interface typeInfoRow {
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
  const { teacherDataGetById, teacherEditRating } = TeacherContext();
  const { addInfo } = MessagesContext();

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
    setInfoRow({
      firstName: teacherDataGetById?.data?.student.user.firstName || '',
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
  );
};

export default TeacherRatingEdit;

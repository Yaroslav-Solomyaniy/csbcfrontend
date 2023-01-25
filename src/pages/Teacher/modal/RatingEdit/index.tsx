import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../context/All/Messages';
import { IEditModal } from '../../../../types';
import { TeacherContext } from '../../../../context/Pages/teacher/Teacher';
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
  const { getTeacherById, editGrade } = TeacherContext();
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
      editGrade?.editTeacherGrade(formData, infoRow.userId);
    }
  };

  useEffect(() => {
    if (editGrade?.data) {
      handleClose();
      addInfo('Оцінку успішно змінено');
    }
  }, [editGrade?.data]);

  useEffect(() => {
    setInfoRow({
      firstName: getTeacherById?.data?.student.user.firstName || '',
      patronymic: getTeacherById?.data?.student.user.patronymic || '',
      lastName: getTeacherById?.data?.student.user.lastName || '',
      courseName: getTeacherById?.data?.course.name || '',
      groupName: getTeacherById?.data?.student.group.name || '',
      grade: getTeacherById?.data?.grade || 0,
      userId: getTeacherById?.data?.student.id || 0,
    });
    setFormData({ ...formData, courseId: getTeacherById?.data?.course.id || 0 });
  }, [
    getTeacherById?.data,
  ]);

  useEffect(() => {
    if (studentId) {
      getTeacherById?.getTeacherById(studentId);
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

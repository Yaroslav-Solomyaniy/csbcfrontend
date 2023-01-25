import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IEditModal } from '../../../../../types';
import { CoursesContext } from '../../../../../context/Pages/admin/Courses';
import CoursesInputForm from '../form/create&edit';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { ICoursesParams } from '../../../../../hooks/api/interfaces';

const formInitialData: ICoursesParams = {
  name: '',
  groups: [],
  teacher: 0,
  credits: null,
  semester: 1,
  isActive: false,
  isExam: false,
  lectureHours: null,
  type: 'Загальна компетентність',
};

export const CourseEdit = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const { addInfo } = MessagesContext();
  const [formData, setFormData] = useState<ICoursesParams>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { editCourse, getCourseById } = CoursesContext();

  const handleClose = () => {
    setIsSubmitted(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.name && formData.credits
      && formData.teacher && formData.semester
      && formData.lectureHours
      && formData.type) {
      editCourse?.editCourse(formData, studentId);
    }
  };

  useEffect(() => {
    if (studentId) {
      getCourseById?.getCourseById({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getCourseById?.data) {
      const data = {
        name: getCourseById?.data.name,
        groups: getCourseById.data.groups.map((item) => item.id),
        teacher: getCourseById?.data?.teacher?.id || 0,
        credits: getCourseById.data.credits ? +getCourseById.data.credits : null,
        semester: getCourseById.data.semester,
        isActive: getCourseById.data.isActive,
        isExam: !!getCourseById.data.isExam,
        lectureHours: getCourseById.data.lectureHours ? +getCourseById.data.lectureHours : null,
        type: getCourseById.data.type,
      };

      setFormData(data);
    }
  }, [getCourseById?.data]);

  useEffect(() => {
    if (editCourse?.data) {
      handleClose();
      addInfo(`Предмет "${formData.name}" успішно відредаговано`);
    }
  }, [editCourse?.data]);

  return (
    <ModalWindow modalTitle="Редагування предмету" active={modalActive} closeModal={handleClose}>
      <CoursesInputForm
        isSubmitted={isSubmitted}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
      />
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default CourseEdit;

import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IEditModal } from '../../../../../types';
import { ICoursesParams } from '../../../../../hooks/PagesInAdmin/useCourses';
import { CoursesContext } from '../../../../../context/PagesInAdmin/Courses';
import CoursesInputForm from '../form/create&edit';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

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
  const { courseEdit, getCourseId } = CoursesContext();

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
      courseEdit?.courseEdit(formData, studentId);
    }
  };

  useEffect(() => {
    if (studentId) {
      getCourseId?.getCourseId({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getCourseId?.data) {
      const data = {
        name: getCourseId?.data.name,
        groups: getCourseId.data.groups.map((item) => item.id),
        teacher: getCourseId?.data?.teacher?.id || 0,
        credits: getCourseId.data.credits ? +getCourseId.data.credits : null,
        semester: getCourseId.data.semester,
        isActive: getCourseId.data.isActive,
        isExam: !!getCourseId.data.isExam,
        lectureHours: getCourseId.data.lectureHours ? +getCourseId.data.lectureHours : null,
        type: getCourseId.data.type,
      };

      setFormData(data);
    }
  }, [getCourseId?.data]);

  useEffect(() => {
    if (courseEdit?.data) {
      handleClose();
      addInfo(`Предмет "${formData.name}" успішно відредаговано`);
    }
  }, [courseEdit?.data]);

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

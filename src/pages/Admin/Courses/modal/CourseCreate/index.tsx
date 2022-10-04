import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../../context/All/Messages';
import { ICoursesCreateParams } from '../../../../../hooks/PagesInAdmin/useCourses';
import { ICreateModal } from '../../../../../types';
import { CoursesContext } from '../../../../../context/PagesInAdmin/Courses';
import CoursesInputForm from '../form/create&edit';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

const formInitialData: ICoursesCreateParams = {
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

export const CourseCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICoursesCreateParams>(formInitialData);

  const { courseCreate } = CoursesContext();
  const { addInfo } = MessagesContext();

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
      && formData.lectureHours && formData.groups.toString().length >= 1
      && formData.type) {
      courseCreate?.createCourse(formData);
    }
  };

  useEffect(() => {
    if (courseCreate?.data) {
      handleClose();
      addInfo(`Предмет "${formData.name}" успішно додано`);
    }
  }, [courseCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення предмету" active={modalActive} closeModal={handleClose}>
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
        mainButtonText="Створити"
      />
    </ModalWindow>
  );
};

export default CourseCreateModal;

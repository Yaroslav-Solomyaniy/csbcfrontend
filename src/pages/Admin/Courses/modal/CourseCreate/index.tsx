import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../../context/All/Messages';
import { ICreateModal } from '../../../../../types';
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

export const CourseCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICoursesParams>(formInitialData);

  const { createCourse } = CoursesContext();
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
      && formData.lectureHours
      && formData.type) {
      if (formData.type === 'Вибіркова фахова компетентність'
        || formData.type === 'Вибіркова загальна компетентність') {
        createCourse?.createCourse({ ...formData, groups: [] });
      } else {
        createCourse?.createCourse(formData);
      }
    }
  };

  useEffect(() => {
    if (createCourse?.data) {
      handleClose();
      addInfo(`Предмет "${formData.name}" успішно додано`);
    }
  }, [createCourse?.data]);

  return (
    <ModalWindow modalTitle="Створення предмету" active={modalActive} closeModal={handleClose}>
      <CoursesInputForm
        isSubmitted={isSubmitted}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
        isCreate
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

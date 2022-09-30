import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { MessagesContext } from '../../../../../context/All/Messages';
import { ICoursesCreateParams } from '../../../../../hooks/PagesInAdmin/useCourses';
import { ICreateModal } from '../../../../../types';
import { CoursesContext } from '../../../../../context/PagesInAdmin/Courses';
import CoursesInputForm from '../form/create&edit';
import { DeviceContext } from '../../../../../context/All/DeviceType';

const formInitialData: ICoursesCreateParams = {
  name: '',
  groups: [],
  teacher: 0,
  credits: null,
  semester: 1,
  isActive: false,
  isExam: false,
  lectureHours: null,
  isCompulsory: 'true',
};

export const CourseCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICoursesCreateParams>(formInitialData);

  const { isTablet, isPhone, isDesktop } = DeviceContext();
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
      && (formData.isCompulsory === 'true' || formData.isCompulsory === 'false')) {
      courseCreate?.createCourse({ ...formData, isCompulsory: formData.isCompulsory === 'true' });
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
        handleClose={handleClose}
        isSubmitted={isSubmitted}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
      />
    </ModalWindow>
  );
};

export default CourseCreateModal;

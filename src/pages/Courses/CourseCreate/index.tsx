import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from './index.module.scss';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import Input from '../../../components/common/Input';
import { ICoursesCreateParams } from '../../../hooks/useCourses';
import { ICreateModal, LettersAndNumbersEnUa, OnlyNumbers } from '../../../types';
import SelectTeacher from '../../../components/common/Select/SelectTeacher';
import SelectSemester from '../../../components/common/Select/SelectSemester';
import SelectCompulsory from '../../../components/common/Select/SelectCompulsory';
import { useCourseContext } from '../../../context/course';
import MultiSelectGroup from '../../../components/common/MultiSelect/MultiSelectGroup';
import SelectExam from '../../../components/common/Select/SelectIsExam';

const formInitialData: ICoursesCreateParams = {
  name: '',
  groups: [],
  teacher: 0,
  credits: '',
  semester: 0,
  isActive: false,
  isExam: '',
  lectureHours: '',
  isCompulsory: '',
};

export const CourseCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICoursesCreateParams>(formInitialData);
  const { courseCreate } = useCourseContext();
  const { addInfo } = useMessagesContext();

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.name && formData.credits.toString().length >= 1 && formData.isExam.toString().length >= 1
      && formData.teacher.toString().length >= 1 && formData.semester.toString().length >= 1
      && formData.lectureHours.toString().length >= 1 && formData.isCompulsory.toString().length >= 1
      && formData.groups.toString().length >= 1) {
      courseCreate?.createCourse(formData);
    }
  };

  useEffect(() => {
    handleClose();
    if (courseCreate?.data) {
      addInfo('Новий предмет успішно додано.');
    }
  }, [courseCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення предмету" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          onChange={(event) => {
            setFormData({ ...formData, name: event.target.value });
          }}
          value={formData.name.slice(0, 50)}
          placeholder="Назва предмету"
          label="Назва предмету"
          required
          error={isSubmitted && !formData.name ? 'Назву предмету не введено.' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <MultiSelectGroup
          type="modal"
          label="Групи"
          placeholder="Групи"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({
              ...formData,
              groups: value.map((option) => (
                +option.value)),
            });
          }}
          value={formData.groups.map((group) => `${group}`)}
          error={isSubmitted && formData.groups.length < 1 ? 'Групи не обрано.' : ''}
        />
        <SelectTeacher
          type="modal"
          label="ПІБ викладача"
          placeholder="ПІБ викладача"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, teacher: +value });
          }}
          value={formData.teacher}
          error={isSubmitted && !formData.teacher ? 'Викладача не обрано.' : ''}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, credits: event.target.value });
          }}
          value={formData.credits.toString().slice(0, 3)}
          placeholder="К-сть кредитів"
          label="К-сть кредитів"
          required
          error={isSubmitted && !formData.credits ? 'К-сть кредитів не введено.' : ''}
          pattern={OnlyNumbers}
        />
        <SelectSemester
          type="modal"
          label="Семестр"
          placeholder="Семестр"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, semester: +value });
          }}
          value={formData.semester}
          error={isSubmitted && !formData.semester ? 'Семестр не обрано.' : ''}
        />
        <SelectExam
          type="modal"
          label="Вид контролю"
          placeholder="Вид контролю"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, isExam: `${value}` });
          }}
          value={formData.isExam}
          error={isSubmitted && !formData.isExam ? 'Вид контролю не обрано.' : ''}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, lectureHours: +event.target.value });
          }}
          value={formData.lectureHours.toString().slice(0, 3)}
          placeholder="К-сть ауд.годин"
          label="К-сть ауд.годин"
          required
          error={isSubmitted && !formData.lectureHours ? 'К-сть ауд.годин не введено.' : ''}
          pattern={OnlyNumbers}
        />
        <SelectCompulsory
          type="modal"
          label="Вид проведення"
          placeholder="Вид проведення"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, isCompulsory: value });
          }}
          value={formData.isCompulsory}
          error={isSubmitted && !formData.isCompulsory ? 'Вид проведення не обрано.' : ''}
        />

      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Додати"
      />
    </ModalWindow>
  );
};

export default CourseCreateModal;

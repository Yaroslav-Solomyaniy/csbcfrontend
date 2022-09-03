import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../components/common/ModalWindow';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import ModalInput from '../../../components/common/ModalInput';
import { ICoursesCreateParams } from '../../../hooks/useCourses';
import { ICreateModal } from '../../../types';
import SelectTeacher from '../../../components/common/Select/SelectTeacher';
import SelectSemester from '../../../components/common/Select/SelectSemester';
import { useCourseContext } from '../../../context/course';
import MultiSelectGroup from '../../../components/common/MultiSelect/MultiSelectGroup';
import SelectCompulsory from '../../../components/common/Select/SelectCompulsory';
import SelectExam from '../../../components/common/Select/SelectIsExam';
import { FiveSymbolOnlyNumbers, LettersAndNumbersEnUa } from '../../../types/regExp';

const formInitialData: ICoursesCreateParams = {
  name: '',
  groups: [],
  teacher: 0,
  credits: null,
  semester: 1,
  isActive: false,
  isExam: false,
  lectureHours: null,
  isCompulsory: '',
};

export const CourseCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICoursesCreateParams>(formInitialData);
  const { courseCreate } = useCourseContext();
  const { addInfo } = useMessagesContext();

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
    handleClose();
    if (courseCreate?.data) {
      addInfo(`Предмет "${formData.name}" успішно додано`);
    }
  }, [courseCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення предмету" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, name: event.target.value.slice(0, 50) });
          }}
          value={formData.name}
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
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, credits: +event.target.value });
          }}
          value={formData.credits || ''}
          placeholder="К-сть кредитів"
          label="К-сть кредитів"
          required
          error={isSubmitted && !formData.credits ? 'К-сть кредитів не введено.' : ''}
          pattern={FiveSymbolOnlyNumbers}
        />
        <SelectSemester
          type="modal"
          label="Семестр"
          placeholder="Семестр"
          required
          isSearchable
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
          onChange={(value) => {
            setFormData({ ...formData, isExam: !!value });
          }}
          value={formData.isExam}
          error={(isSubmitted && !(formData.isExam === true
            || formData.isExam === false)) ? 'Вид контролю не обрано.' : ''}
        />
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, lectureHours: +event.target.value });
          }}
          value={formData.lectureHours || ''}
          placeholder="К-сть ауд.годин"
          label="К-сть ауд.годин"
          required
          error={isSubmitted && !formData.lectureHours ? 'К-сть ауд.годин не введено.' : ''}
          pattern={FiveSymbolOnlyNumbers}
        />
        <SelectCompulsory
          type="modal"
          label="Вид проведення"
          placeholder="Вид проведення"
          required
          isSearchable
          onChange={(value) => {
            setFormData({ ...formData, isCompulsory: value });
          }}
          value={formData.isCompulsory}
          error={(isSubmitted && !(formData.isCompulsory === 'true'
            || formData.isCompulsory === 'false')) ? 'Вид проведення не обрано.' : ''}
        />
      </form>
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

import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IEditModal, LettersAndNumbersEnUa, OnlyNumbers } from '../../../types';
import { ICourseEditParams } from '../../../hooks/useCourses';
import Input from '../../../components/common/Input';
import MultiSelectGroup from '../../../components/common/MultiSelect/MultiSelectGroup';
import SelectTeacher from '../../../components/common/Select/SelectTeacher';
import SelectSemester from '../../../components/common/Select/SelectSemester';
import { useCourseContext } from '../../../context/course';
import SelectCompulsory from '../../../components/common/Select/SelectCompulsory';
import SelectExam from '../../../components/common/Select/SelectIsExam';

const formInitialData: ICourseEditParams = {
  name: '',
  groups: [],
  teacher: 0,
  credits: null,
  semester: 1,
  isActive: false,
  isExam: false,
  lectureHours: null,
  isCompulsory: false,
};

export const CourseEdit = ({ modalActive, closeModal, Id }: IEditModal): JSX.Element => {
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<ICourseEditParams>(formInitialData);
  const [isSubmitted, setIsSubmited] = useState(false);
  const { courseEdit, getCourseId } = useCourseContext();

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
    /*   if (formData.name && formData.credits.toString().length >= 1 && formData.isExam.toString().length >= 1
         && formData.teacher.toString().length >= 1 && formData.semester.toString().length >= 1
         && formData.lectureHours.toString().length >= 1 && formData.isCompulsory.toString().length >= 1
         && formData.groups.toString().length >= 1) { */
    courseEdit?.courseEdit({ ...formData }, Id);
    /*    } */
  };

  useEffect(() => {
    if (Id) {
      getCourseId?.getCourseId({ id: `${Id}` });
    }
  }, [Id]);

  useEffect(() => {
    if (getCourseId?.data) {
      const data = {
        name: getCourseId?.data.name,
        groups: getCourseId.data.groups.map((item) => item.id),
        teacher: getCourseId.data.teacher.id,
        credits: getCourseId.data.credits ? +getCourseId.data.credits : null,
        semester: getCourseId.data.semester,
        isActive: getCourseId.data.isActive,
        isExam: !!getCourseId.data.isExam,
        lectureHours: getCourseId.data.lectureHours ? +getCourseId.data.lectureHours : null,
        isCompulsory: getCourseId.data.isCompulsory,
      };

      setFormData(data);
      console.log(data);
    }
  }, [getCourseId?.data]);

  useEffect(() => {
    handleClose();
  }, [courseEdit?.data]);

  return (
    <ModalWindow modalTitle="Редагування предмету" active={modalActive} closeModal={handleClose}>
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
            setFormData({ ...formData, credits: +event.target.value ? +event.target.value : null });
          }}
          value={formData.credits || ''}
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
            setFormData({ ...formData, isExam: !!value });
          }}
          value={formData.isExam}
          error={isSubmitted && !formData.isExam ? 'Вид контролю не обрано.' : ''}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, lectureHours: +event.target.value });
          }}
          value={formData.lectureHours || ''}
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
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default CourseEdit;

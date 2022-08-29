import React, { useEffect, useState } from 'react';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IEditModal } from '../../../types';
import { ICourseEditParams } from '../../../hooks/useCourses';
import ModalInput from '../../../components/common/ModalInput';
import MultiSelectGroup from '../../../components/common/MultiSelect/MultiSelectGroup';
import SelectTeacher from '../../../components/common/Select/SelectTeacher';
import SelectSemester from '../../../components/common/Select/SelectSemester';
import { useCourseContext } from '../../../context/course';
import SelectCompulsory from '../../../components/common/Select/SelectCompulsory';
import SelectExam from '../../../components/common/Select/SelectIsExam';
import { FiveSymbolOnlyNumbers, LettersAndNumbersEnUa } from '../../../types/regExp';

const formInitialData: ICourseEditParams = {
  name: '',
  groups: [],
  teacher: 0,
  credits: null,
  semester: 1,
  isExam: false,
  lectureHours: null,
  isCompulsory: '',
};

export const CourseEdit = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
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
    if (formData.name && formData.credits
      && formData.teacher && formData.semester
      && formData.lectureHours && formData.groups.toString().length >= 1
    ) {
      courseEdit?.courseEdit({ ...formData, isCompulsory: formData.isCompulsory === 'true' }, studentId);
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
        teacher: getCourseId?.data?.teacher?.id || null,
        credits: getCourseId.data.credits ? +getCourseId.data.credits : null,
        semester: getCourseId.data.semester,
        isActive: getCourseId.data.isActive,
        isExam: !!getCourseId.data.isExam,
        lectureHours: getCourseId.data.lectureHours ? +getCourseId.data.lectureHours : null,
        isCompulsory: getCourseId.data.isCompulsory,
      };

      setFormData(data);
    }
  }, [getCourseId?.data]);

  useEffect(() => {
    handleClose();
    if (courseEdit?.data) {
      addInfo(`Предмет "${formData.name}" успішно відредаговано`);
    }
  }, [courseEdit?.data]);

  return (
    <ModalWindow modalTitle="Редагування предмету" active={modalActive} closeModal={handleClose}>
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

import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IEditModal } from '../../../types';
import { ICourseEditParams } from '../../../hooks/useCourses';
import Input from '../../../components/common/Input';
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
  isActive: false,
  isExam: false,
  lectureHours: null,
  isCompulsory: '',
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
    if (formData.name && formData.credits
      && formData.teacher && formData.semester
      && formData.lectureHours && formData.groups.toString().length >= 1
      && (formData.isCompulsory === 'true' || formData.isCompulsory === 'false')) {
      courseEdit?.courseEdit({ ...formData, isCompulsory: formData.isCompulsory === 'true' }, Id);
    }
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
    }
  }, [getCourseId?.data]);

  useEffect(() => {
    handleClose();
  }, [courseEdit?.data]);

  return (
    <ModalWindow modalTitle="?????????????????????? ????????????????" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          onChange={(event) => {
            setFormData({ ...formData, name: event.target.value });
          }}
          value={formData.name.slice(0, 50)}
          placeholder="?????????? ????????????????"
          label="?????????? ????????????????"
          required
          error={isSubmitted && !formData.name ? '?????????? ???????????????? ???? ??????????????.' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <MultiSelectGroup
          type="modal"
          label="??????????"
          placeholder="??????????"
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
          error={isSubmitted && formData.groups.length < 1 ? '?????????? ???? ????????????.' : ''}
        />
        <SelectTeacher
          type="modal"
          label="?????? ??????????????????"
          placeholder="?????? ??????????????????"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, teacher: +value });
          }}
          value={formData.teacher}
          error={isSubmitted && !formData.teacher ? '?????????????????? ???? ????????????.' : ''}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, credits: +event.target.value });
          }}
          value={formData.credits || ''}
          placeholder="??-?????? ????????????????"
          label="??-?????? ????????????????"
          required
          error={isSubmitted && !formData.credits ? '??-?????? ???????????????? ???? ??????????????.' : ''}
          pattern={FiveSymbolOnlyNumbers}
        />
        <SelectSemester
          type="modal"
          label="??????????????"
          placeholder="??????????????"
          required
          isSearchable
          onChange={(value) => {
            setFormData({ ...formData, semester: +value });
          }}
          value={formData.semester}
          error={isSubmitted && !formData.semester ? '?????????????? ???? ????????????.' : ''}
        />
        <SelectExam
          type="modal"
          label="?????? ????????????????"
          placeholder="?????? ????????????????"
          required
          isSearchable
          onChange={(value) => {
            setFormData({ ...formData, isExam: !!value });
          }}
          value={formData.isExam}
          error={(isSubmitted && !(formData.isExam === true
            || formData.isExam === false)) ? '?????? ???????????????? ???? ????????????.' : ''}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, lectureHours: +event.target.value });
          }}
          value={formData.lectureHours || ''}
          placeholder="??-?????? ??????.??????????"
          label="??-?????? ??????.??????????"
          required
          error={isSubmitted && !formData.lectureHours ? '??-?????? ??????.?????????? ???? ??????????????.' : ''}
          pattern={FiveSymbolOnlyNumbers}
        />
        <SelectCompulsory
          type="modal"
          label="?????? ????????????????????"
          placeholder="?????? ????????????????????"
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
        cancelButtonText="??????????????"
        mainButtonText="????????????????"
      />
    </ModalWindow>
  );
};

export default CourseEdit;

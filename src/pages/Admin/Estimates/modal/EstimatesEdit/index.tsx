import React, { useEffect, useState } from 'react';
import styles from '../../../../pagesStyle.module.scss';
import ModalWindow from '../../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../../../types';
import { EstimatesContext } from '../../../../../context/PagesInAdmin/Estimates';
import ModalInput from '../../../../../components/common/MyInput';
import { OnlyNumbers } from '../../../../../types/regExp';
import SelectReason from '../../../../../components/common/Select/SelectReason';

interface IFormInitialData {
  grade: number | string;
  courseId: number | string;
  courseName: string;
  newGrade: number | string;
  reasonChange: string;
}

const formInitialData: IFormInitialData = {
  grade: 0,
  courseId: 0,
  courseName: '',
  newGrade: 0,
  reasonChange: 'Екзамен',
};

export const EstimatesEdit = ({ modalActive, closeModal, studentId, gradeId }: IEditModal): JSX.Element => {
  const { gradesEdit, gradesGetId } = EstimatesContext();
  const [formData, setFormData] = useState(formInitialData);
  const [isSubmitted, setIsSubmited] = useState(false);

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);

    if (
      formData.courseId
      && formData.newGrade
      && formData.reasonChange
    ) {
      gradesEdit?.gradesEdit({
        courseId: +formData.courseId,
        grade: +formData.newGrade,
        reasonForChange: formData.reasonChange,
      }, studentId);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      courseId: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.course.id || '',
      courseName: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.course.name || '',
      grade: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.grade || '0',
      newGrade: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.grade || '0',
    });
  }, [gradesGetId?.data]);

  useEffect(() => {
    handleClose();
  }, [gradesEdit?.data]);

  useEffect(() => {
    if (studentId) {
      gradesGetId?.getGradesId({ id: studentId });
    }
  }, [studentId]);

  return (
    <ModalWindow modalTitle="Редагування оцінки" active={modalActive && !!gradeId} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.subtitle}>
          {`${gradesGetId?.data?.user.lastName}
          ${gradesGetId?.data?.user.firstName}
          ${gradesGetId?.data?.user.patronymic}, ${gradesGetId?.data?.group.name}`}
        </div>
        <div className={styles.subtitle}>
          Предмет:
          {formData.courseName}
        </div>
        <div className={styles.subtitle}>
          Поточна оцінка:
          {formData.grade}
        </div>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, newGrade: +event.target.value });
          }}
          value={formData.newGrade}
          error={isSubmitted && !formData.newGrade ? 'Оцінку не введено'
            : formData.newGrade > 100 ? 'Оцінка не може бути більше 100' : ''}
          placeholder="Нова оцінка"
          label="Введіть нову оцінку"
          required
          pattern={OnlyNumbers}
        />
        <SelectReason
          type="modal"
          label="Причина зміни"
          placeholder="Причина зміни"
          required
          isSearchable
          onChange={(value) => {
            setFormData({ ...formData, reasonChange: value });
          }}
          value={formData.reasonChange}
          error={isSubmitted && !formData.reasonChange ? 'Причину зміни не обрано.' : ''}
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

EstimatesEdit.defaultProps = {
  gradeId: 0,
};

export default EstimatesEdit;

import React, { useEffect, useState } from 'react';
import styles from '../../../pagesStyle.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../../types';
import { useEstimatesContext } from '../../../../context/estimates';
import ModalInput from '../../../../components/common/ModalInput';
import SelectReasonStr from '../../../../components/common/Select/SelectReasonStr';
import { OnlyNumbers } from '../../../../types/regExp';
import SelectReason from '../../../../components/common/Select/SelectReason';

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
  reasonChange: '',
};

export const EstimatesEdit = ({ modalActive, closeModal, studentId, gradeId }: IEditModal): JSX.Element => {
  const { gradesEdit, gradesGetId } = useEstimatesContext();
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
      grade: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.grade || '',
      newGrade: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.grade || '',
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
    <ModalWindow modalTitle="Редагування оцінки" active={modalActive} closeModal={handleClose}>
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
          error={isSubmitted && !formData.newGrade
            ? (formData.newGrade as number > 100 ? 'Оцінка не може бути більше 100' : 'Оцінку не введено')
            : ''}
          placeholder="Нова оцінка"
          label="Введіть нову оцінку"
          required
          pattern={OnlyNumbers}
        />
        <SelectReasonStr
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

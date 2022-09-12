import React, { useEffect, useState } from 'react';
import styles from '../../../pagesStyle.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../../types';
import { useEstimatesContext } from '../../../../context/estimates';
import ModalInput from '../../../../components/common/ModalInput';
import SelectReasonStr from '../../../../components/common/Select/SelectReasonStr';

interface IFormInitialData {
  grade: number | undefined;
  courseId: number | undefined;
  courseName: string | undefined;
  newGrade: number | undefined;
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
        courseId: formData.courseId,
        grade: formData.newGrade,
        reasonForChange: formData.reasonChange,
      }, studentId);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      courseId: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.course.id,
      courseName: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.course.name,
      grade: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.grade,
      newGrade: gradesGetId?.data?.grades.find((element) => element.id === gradeId)?.grade,
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
    <ModalWindow modalTitle="Редагування групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p>
          {`${gradesGetId?.data?.user.lastName} ${gradesGetId?.data?.user.firstName}
        ${gradesGetId?.data?.user.patronymic}, ${gradesGetId?.data?.group.name}`}
        </p>
        <p>
          {`${formData.courseName}, Поточна оцінка: ${formData.grade}`}
        </p>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, newGrade: +event.target.value });
          }}
          value={formData.newGrade}
          error={isSubmitted && !formData.newGrade ? 'Номер групи не введено.' : ''}
          placeholder="Введіть нову оцінку*"
          label="Введіть нову оцінку*"
          required
        />
        <SelectReasonStr
          type="modal"
          label="Причина зміни*"
          placeholder="Причина зміни"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, reasonChange: value });
          }}
          value={formData.reasonChange}
          error={isSubmitted && !formData.reasonChange ? 'Куратор не обраний.' : ''}
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

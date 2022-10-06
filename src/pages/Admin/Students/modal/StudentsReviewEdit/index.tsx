import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import stylesStud from '../../../../pagesStyle.module.scss';
import ModalWindow from '../../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { StudentsContext } from '../../../../../context/PagesInAdmin/Students';
import { IndividualPlanContext } from '../../../../../context/IndividualPlan';
import MultiSelectCoursesNoOptional from '../../../../../components/common/MultiSelect/MultiSelectCoursesNoOptional';

interface IStudentsReviewModal {
  closeModal: () => void;
  modalActive: boolean;
  courses?: {
    required: number[];
    noRequired: number[];
  };
  id: number;
}

const StudentsReviewEdit = ({ modalActive, closeModal, courses, id }: IStudentsReviewModal) => {
  const { editPlan } = IndividualPlanContext();
  const { getStudentById } = StudentsContext();
  const [data, setData] = useState<{
    required: number[];
    noRequired: number[];
  }>({
    required: [],
    noRequired: [],
  });

  useEffect(() => {
    if (courses) setData(courses);
  }, [courses]);

  const handleClose = () => {
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    editPlan?.EditPlan([...data.required, ...data.noRequired], id);
    handleClose();
  };

  return (
    <ModalWindow modalTitle="Редагування індивідуального плану" active={modalActive} closeModal={handleClose}>
      <form className={stylesStud.form} onSubmit={onSubmit}>
        <p className={styles.form__name}>
          {`${getStudentById?.data?.user.lastName} ${getStudentById?.data?.user.firstName}
            ${getStudentById?.data?.user.patronymic}`}
        </p>
        <p className={styles.form__title}>Вибіркові предмети</p>
        <MultiSelectCoursesNoOptional
          type="modal"
          label="Фахові компетентності"
          placeholder="Фахові компетентності"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setData({
              ...data,
              required: value.map((Option) => +Option.value),
            });
          }}
          value={data.required.map((course) => `${course}`)}
          typeConduct="Фахова"
        />
        <MultiSelectCoursesNoOptional
          type="modal"
          label="Загальні компетентності"
          placeholder="Загальні компетентності"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setData({
              ...data,
              noRequired: value.map((Option) => +Option.value),
            });
          }}
          value={data.noRequired.map((course) => `${course}`)}
          typeConduct="Загальна"
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

StudentsReviewEdit.defaultProps = {
  courses: {
    required: [],
    noRequired: [],
  },
};

export default StudentsReviewEdit;

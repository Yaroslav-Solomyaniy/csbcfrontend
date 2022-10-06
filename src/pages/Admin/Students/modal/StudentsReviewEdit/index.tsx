import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import stylesStud from '../../../../pagesStyle.module.scss';
import ModalWindow from '../../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { StudentsContext } from '../../../../../context/PagesInAdmin/Students';
import { IndividualPlanContext } from '../../../../../context/IndividualPlan';
import MultiSelectCoursesNoOptional from '../../../../../components/common/MultiSelect/MultiSelectCoursesNoOptional';
import { MessagesContext } from '../../../../../context/All/Messages';

interface IStudentsReviewModal {
  closeModal: () => void;
  modalActive: boolean;
  id: number;
}

const StudentsReviewEdit = ({ modalActive, closeModal, id }: IStudentsReviewModal) => {
  const { editPlan, getPlan } = IndividualPlanContext();
  const { addInfo } = MessagesContext();
  const { getStudentById } = StudentsContext();
  const [data, setData] = useState<{
    required: number[];
    noRequired: number[];
  }>({
    required: [],
    noRequired: [],
  });

  useEffect(() => {
    if (getStudentById?.data) {
      getPlan?.getPlan({ id: getStudentById?.data?.user.id || 0 });
    }
  }, [getStudentById?.data]);

  useEffect(() => {
    setData({
      required: getPlan?.data ? getPlan?.data?.grades
        .filter((grade) => grade.course.type === 'Вибіркова фахова компетентність')
        .map((grade) => grade.course.id) : [],
      noRequired: getPlan?.data ? getPlan?.data?.grades
        .filter((grade) => grade.course.type === 'Вибіркова загальна компетентність')
        .map((grade) => grade.course.id) : [],
    });
  }, [getPlan?.data]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    editPlan?.EditPlan({ courses: [...data.required, ...data.noRequired] }, id);
  };

  useEffect(() => {
    if (editPlan?.data) {
      closeModal();
      addInfo('Вибіркові предмети студента успішно відредаговані');
    }
  }, [editPlan?.data]);

  return (
    <ModalWindow modalTitle="Редагування індивідуального плану" active={modalActive} closeModal={closeModal}>
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
        handleClose={closeModal}
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

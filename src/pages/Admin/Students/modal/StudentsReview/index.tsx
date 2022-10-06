import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import StudentModalArrow from '../../../../../images/StudentModalArrow.svg';
import { StudentsContext } from '../../../../../context/PagesInAdmin/Students';
import Table from '../../../../../components/common/Table';
import Button from '../../../../../components/common/Button';
import StudentsReviewEdit from '../StudentsReviewEdit';
import { IndividualPlanHeader } from '../../../../Student/IndividualPlan/types';
import { IndividualPlanContext } from '../../../../../context/IndividualPlan';

interface IStudentsReviewModal {
  closeModal: () => void;
  modalActive: boolean;
  id: number;
}

const StudentsReview = ({ modalActive, closeModal, id }: IStudentsReviewModal) => {
  const { getStudentById } = StudentsContext();
  const [modalEditActive, setModalEditActive] = useState(false);

  useEffect(() => {
    if (id) {
      getStudentById?.getStudentId({ id: `${id}` });
    }
  }, [id]);

  const { getPlan } = IndividualPlanContext();

  useEffect(() => {
    if (getStudentById?.data) {
      getPlan?.getPlan({ id: getStudentById?.data?.user.id || 0 });
    }
  }, [getStudentById?.data]);

  return (
    <div className={clsx(modalActive && styles.overlay)}>
      <div className={clsx(styles.modal, modalActive && styles.modal__active)}>
        <div className={styles.content}>
          <button className={styles.cancel} onClick={closeModal} type="button">
            <img className={styles.arrow} src={StudentModalArrow} alt="повернутись" />
            Індивідуальний план студента групи
            {` ${getStudentById?.data?.group.name} ${getStudentById?.data?.user.lastName}
           ${getStudentById?.data?.user.firstName} ${getStudentById?.data?.user.patronymic}`}
          </button>
          <div className={styles.content__subtitle}>
            <h1 className={styles.content__subtitle__h1}>Обовязкові предмети</h1>
          </div>
          <Table
            heightVH="20vh"
            gridColumns={styles.columns}
            dataRow={(getPlan?.data?.grades
              // eslint-disable-next-line max-len
              .filter((course) => (course.course.type === 'Загальна компетентність' || course.course.type === 'Фахова компетентність'))
              .map((item) => ({
                list: [
                  { id: 1, label: item.course.name },
                  {
                    id: 2,
                    label: `${item.course.teacher.lastName}
                ${item.course.teacher.firstName[0]}. ${item.course.teacher.patronymic[0]}.`,
                  },
                  { id: 3, label: item.course.credits },
                  { id: 4, label: item.course.lectureHours },
                  { id: 5, label: item.course.isExam ? 'Екзамен' : 'Залік' },
                  { id: 6, label: item.grade },
                ],
                key: item.id,
              }))) || []}
            dataHeader={IndividualPlanHeader}
            isTableResult
          />
          <div className={styles.content__subtitle}>
            <h1 className={styles.content__subtitle__h1}>Вибіркові предмети</h1>
            <Button
              nameClass="secondary"
              size="large"
              className={styles.content__subtitle__actions}
              onClick={() => setModalEditActive(true)}
            >
              Редагувати
            </Button>
          </div>

          <div>
            <Table
              heightVH="20vh"
              gridColumns={styles.columns}
              dataRow={(getPlan?.data?.grades
                // eslint-disable-next-line max-len
                .filter((course) => (course.course.type === 'Вибіркова загальна компетентність' || course.course.type === 'Вибіркова фахова компетентність'))
                .map((item) => ({
                  list: [
                    { id: 1, label: item.course.name },
                    {
                      id: 2,
                      label: `${item.course.teacher.lastName}
                ${item.course.teacher.firstName[0]}. ${item.course.teacher.patronymic[0]}.`,
                    },
                    { id: 3, label: item.course.credits },
                    { id: 4, label: item.course.lectureHours },
                    { id: 5, label: item.course.isExam ? 'Екзамен' : 'Залік' },
                    { id: 6, label: item.grade },
                  ],
                  key: item.id,
                }))) || []}
              dataHeader={IndividualPlanHeader}
              isTableResult
            />
          </div>
        </div>
        <StudentsReviewEdit closeModal={() => setModalEditActive(false)} modalActive={modalEditActive} />
      </div>
    </div>
  );
};

export default StudentsReview;

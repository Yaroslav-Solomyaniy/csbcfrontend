import React, { useEffect } from 'react';
import Layout from '../../../loyout/Layout';
import { IndividualPlanContext } from '../../../context/IndividualPlan';
import TitlePage from '../../../components/common/TitlePage';
import styles from './index.module.scss';
import { AuthContext } from '../../../context/All/AuthContext';
import Table from '../../../components/common/Table';
import { IndividualPlanHeader } from './types';

const StudentIndividualPlan = ():JSX.Element => {
  const { getPlan } = IndividualPlanContext();
  const { user } = AuthContext();

  useEffect(() => {
    getPlan?.getPlan({ id: user?.id || 0 });
  }, []);

  return (
    <Layout>
      <div>
        <TitlePage title="Індивідуальний план" />
        <div className={styles.requiredTable}>
          <h1 className={styles.table__title}>Обов'язкові предмети</h1>
          <Table
            gridColumns={styles.columns}
            dataRow={(getPlan?.data?.grades
              // eslint-disable-next-line max-len
              .filter((course) => (course.course.type === 'Загальна компетентність' || course.course.type === 'Фахова компетентність'))
              .map((item) => ({
                list: [
                  { id: 1, label: item.course.name },
                  { id: 2,
                    label: `${item.course.teacher.lastName}
                ${item.course.teacher.firstName[0]}. ${item.course.teacher.patronymic[0]}.` },
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
        <div className={styles.notRequiredTable}>
          <h1 className={styles.table__title}>Не обов'язкові предмети</h1>
          <Table
            gridColumns={styles.columns}
            dataRow={(getPlan?.data?.grades
              // eslint-disable-next-line max-len
              .filter((course) => (course.course.type === 'Вибіркова загальна компетентність' || course.course.type === 'Вибіркова фахова компетентність'))
              .map((item) => ({
                list: [
                  { id: 1, label: item.course.name },
                  { id: 2,
                    label: `${item.course.teacher.lastName}
                ${item.course.teacher.firstName[0]}. ${item.course.teacher.patronymic[0]}.` },
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
    </Layout>
  );
};

export default StudentIndividualPlan;

import React, { useEffect, useState } from 'react';
import Layout from '../../../loyout/Layout';
import { IndividualPlanContext } from '../../../context/Pages/student/IndvPlan';
import TitlePage from '../../../components/common/TitlePage';
import styles from './index.module.scss';
import { AuthContext } from '../../../context/All/AuthContext';
import Table from '../../../components/common/Table';
import { IndividualPlanHeader } from './types';
import Preloader from '../../../components/common/Preloader/Preloader';
import SelectSemester from '../../../components/common/Select/SelectSemester';
import Button from '../../../components/common/Button';
import { useDownloadFile } from '../../../hooks/hooks/useDownloadFile';
import { Semesters } from '../../../types';
import { useQueryParam } from '../../../hooks/hooks/useQueryParams';

const StudentIndividualPlan = ():JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getPlan, download } = IndividualPlanContext();
  const { post, get } = useQueryParam();
  const { user } = AuthContext();

  const semester = Number(get('semester')) || 1;

  useEffect(() => {
    getPlan?.getPlan({ id: user?.id || 0, semester });
  }, [semester]);

  useEffect(() => {
    setIsLoading(false);
  }, [getPlan?.data]);

  useEffect(() => {
    if (download?.dataFile) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDownloadFile(
        download.dataFile,
        // eslint-disable-next-line max-len
        `Індивідуальний план - ${Semesters[semester]}. ${user?.lastName} ${user?.firstName[0].toUpperCase()}.`,
      );
    }
  }, [download?.dataFile]);

  return (
    <Layout>
      <TitlePage
        title="Індивідуальний план"
        isHaveSelect
        action={(
          <div className={styles.actions}>
            <SelectSemester onChange={(value) => post({ semester: value })} type="mini" value={semester} />
            <Button
              className={styles.downloadButton}
              onClick={() => download?.download({ id: user?.id || 0, semester })}
              size="large"
              nameClass="primary"
            >
              Завантажити
            </Button>
          </div>
      )}
      />
      {isLoading ? <Preloader /> : (
        <>
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
            <h1 className={styles.table__title}>Вибіркові предмети</h1>
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
        </>
      )}
    </Layout>
  );
};

export default StudentIndividualPlan;

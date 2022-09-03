import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import TitlePage from '../../components/TitlePage';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import pagestyles from '../pagesStyle.module.scss';
import { useStudentsContext } from '../../context/student';
import Table from '../../components/common/table';
import { IGetStudentVotingData } from '../../hooks/usePageInStudents';
import { IGetCoursesData } from '../../hooks/useCourses';
import { IPaginateData } from '../../types';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Дія' },
  { id: 2, label: 'Назва дисципліни' },
  { id: 3, label: 'ПІБ викладача' },
  { id: 4, label: 'К-ть кредитів' },
  { id: 5, label: 'К-ть аудиторних годин' },
];

const formInitialDataVotingCourses:IGetStudentVotingData = {
  requiredCourses: [],
  notRequiredCourses: [],
};

const VotingStudents = (): JSX.Element => {
  const [votingCourses, setVotingCourses] = useState<IGetStudentVotingData>(formInitialDataVotingCourses);
  const [isDraw, setIsDraw] = useState(false);
  const { getVoting } = useStudentsContext();

  useEffect(() => {
    getVoting?.getVotingStudent();
  }, []);

  useEffect(() => {
    if (getVoting?.data) {
      setVotingCourses(getVoting.data);
    }
  }, [getVoting?.data]);

  return (
    <Layout>
      <div>
        <TitlePage
          title="Голосування"
        />
        <h1 className={clsx(pagestyles.title, styles.firstTitle)}>Вибірковий профільний предмет(I семестр)</h1>
        <Table
          dataHeader={dataHeader}
          dataRow={votingCourses.requiredCourses.filter((item) => item.semester === 1).map((course) => ({ list: [
            { id: 1, label: '  •' },
            { id: 2, label: course.name },
            { id: 3, label: `${course.teacher.lastName} ${course.teacher.firstName} ${course.teacher.patronymic}` },
            { id: 4, label: course.credits },
            { id: 5, label: course.lectureHours },
          ],
          key: course.id }))}
          gridColumns={styles.columns}
        />
        <h1 className={pagestyles.title}>Вибірковий непрофільний предмет(I семестр)</h1>
        <Table
          dataHeader={dataHeader}
          dataRow={votingCourses.notRequiredCourses.filter((item) => item.semester === 1).map((course) => ({ list: [
            { id: 1, label: '•' },
            { id: 2, label: course.name },
            { id: 3, label: `${course.teacher.lastName} ${course.teacher.firstName} ${course.teacher.patronymic}` },
            { id: 4, label: course.credits },
            { id: 5, label: course.lectureHours },
          ],
          key: course.id }))}
          gridColumns={styles.columns}
        />
        <h1 className={pagestyles.title}>Вибірковий профільний предмет(II семестр)</h1>
        <Table
          dataHeader={dataHeader}
          dataRow={votingCourses.requiredCourses.filter((item) => item.semester === 2).map((course) => ({ list: [
            { id: 1, label: '•' },
            { id: 2, label: course.name },
            { id: 3, label: `${course.teacher.lastName} ${course.teacher.firstName} ${course.teacher.patronymic}` },
            { id: 4, label: course.credits },
            { id: 5, label: course.lectureHours },
          ],
          key: course.id }))}
          gridColumns={styles.columns}
        />
        <h1 className={pagestyles.title}>Вибірковий непрофільний предмет(II семестр)</h1>
        <Table
          dataHeader={dataHeader}
          dataRow={votingCourses.notRequiredCourses.filter((item) => item.semester === 2).map((course) => ({ list: [
            { id: 1, label: '•' },
            { id: 2, label: course.name },
            { id: 3, label: `${course.teacher.lastName} ${course.teacher.firstName} ${course.teacher.patronymic}` },
            { id: 4, label: course.credits },
            { id: 5, label: course.lectureHours },
          ],
          key: course.id }))}
          gridColumns={styles.columns}
        />
      </div>
    </Layout>
  );
};

export default VotingStudents;

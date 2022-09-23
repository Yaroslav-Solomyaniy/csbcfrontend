import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import TitlePage from '../../components/TitlePage';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import pagestyles from '../pagesStyle.module.scss';
import { useStudentsContext } from '../../context/student';
import Table from '../../components/common/table';
import { IGetStudentVotingData, IVotingStudentPostParams } from '../../hooks/usePageInStudents';
import Button from '../../components/common/Button';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Дія' },
  { id: 2, label: 'Назва дисципліни' },
  { id: 3, label: 'ПІБ викладача' },
  { id: 4, label: 'К-ть кредитів' },
  { id: 5, label: 'К-ть аудиторних годин' },
];

const formInitialDataVotingCourses:IGetStudentVotingData = {
  isRevote: false,
  requiredCourses: [],
  notRequiredCourses: [],
};

const VotingStudents = (): JSX.Element => {
  const [votingCourses, setVotingCourses] = useState<IGetStudentVotingData>(formInitialDataVotingCourses);
  const [isDraw, setIsDraw] = useState(false);
  const { getVoting, votingCreate } = useStudentsContext();
  const [formData, setFormData] = useState<IVotingStudentPostParams>({ courses: [0, 0, 0, 0] });

  useEffect(() => {
    getVoting?.getVotingStudent();
  }, []);

  useEffect(() => {
    if (getVoting?.data) {
      setVotingCourses(getVoting.data);
      setIsDraw(true);
    }
  }, [getVoting?.data]);

  const AnswerPostVoting = () => {
    votingCreate?.studentVotingCreate(formData);
  };

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => (
    setFormData({
      ...formData,
      courses: formData.courses.map((course, index) => (
        index === +e.target.name ? +e.currentTarget.value : course)),
    }));

  return (
    <Layout>
      <div className={styles.contentVoting}>
        <TitlePage
          title="Голосування"
        />
        {isDraw ? (
          <>
            <h1 className={clsx(pagestyles.title, styles.firstTitle)}>Вибірковий профільний предмет(I семестр)</h1>
            <Table
              dataHeader={dataHeader}
              dataRow={votingCourses.requiredCourses.filter((item) => item.semester === 1).map((course) => ({ list: [
                { id: 1,
                  label: <input
                    type="radio"
                    name="0"
                    checked={course.id === formData.courses[0]}
                    value={course.id}
                    onChange={handleRadioClick}
                  /> },
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
                { id: 1,
                  label: <input
                    type="radio"
                    name="1"
                    checked={course.id === formData.courses[1]}
                    value={course.id}
                    onChange={handleRadioClick}
                  /> },
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
                { id: 1,
                  label: <input
                    type="radio"
                    name="2"
                    checked={course.id === formData.courses[2]}
                    value={course.id}
                    onChange={handleRadioClick}
                  /> },
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
                { id: 1,
                  label: <input
                    type="radio"
                    name="3"
                    checked={course.id === formData.courses[3]}
                    value={course.id}
                    onChange={handleRadioClick}
                  /> },
                { id: 2, label: course.name },
                { id: 3, label: `${course.teacher.lastName} ${course.teacher.firstName} ${course.teacher.patronymic}` },
                { id: 4, label: course.credits },
                { id: 5, label: course.lectureHours },
              ],
              key: course.id }))}
              gridColumns={styles.columns}

            />
            <div className={styles.voting_footer}>
              <Button
                onClick={AnswerPostVoting}
                size="large"
                nameClass="primary"
                className={styles.button}
                disabled={formData.courses.includes(0)}
              >
                Проголосувати
              </Button>
            </div>
          </>
        )
          : (
            <div className={styles.noActiveVoting}>
              <h1 className={styles.noActiveVotingTitle}>Немає доступних голосувань </h1>
            </div>
          )}

      </div>
    </Layout>
  );
};

export default VotingStudents;

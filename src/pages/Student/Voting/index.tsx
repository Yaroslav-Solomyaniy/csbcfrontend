import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import TitlePage from '../../../components/common/TitlePage';
import styles from './index.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import pagestyles from '../../pagesStyle.module.scss';
import Table from '../../../components/common/Table';
import { IGetStudentVotingData, IVotingStudentPostParams } from '../../../hooks/PagesInStudents/usePageInStudents';
import Button from '../../../components/common/Button';
import { StudentVotingContext } from '../../../context/PagesInStudent/Student';
import Preloader from '../../../components/common/Preloader/Preloader';
import { MessagesContext } from '../../../context/All/Messages';
import { DeviceContext } from '../../../context/All/DeviceType';

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
  studentVotes: [],
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  approveCourse: [],
};

const VotingStudents = (): JSX.Element => {
  const [isDraw, setIsDraw] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<IVotingStudentPostParams>({ courses: [0, 0, 0, 0] });
  const [votingInfo, setVotingInfo] = useState<IGetStudentVotingData>(formInitialDataVotingCourses);

  const { getVoting, votingCreate, votingEdit } = StudentVotingContext();
  const { addInfo } = MessagesContext();
  const { isPhone } = DeviceContext();
  const compare = (a1:number[], a2: number[]) => a1.length === a2.length && a1.every((v, i) => v === a2[i]);

  useEffect(() => {
    getVoting?.getVotingStudent();
  }, [votingCreate?.data, votingEdit?.data]);

  useEffect(() => {
    if (getVoting?.data) {
      setVotingInfo(Array.isArray(getVoting.data) ? formInitialDataVotingCourses : getVoting.data);
      setIsDraw(!Array.isArray(getVoting.data));
      setIsLoading(false);
    }
  }, [getVoting?.data]);

  useEffect(() => {
    if (votingInfo) {
      setFormData({ courses: votingInfo.studentVotes.length
        ? votingInfo.studentVotes
          .sort((a, b) => a[0] - b[0])
          .map((element) => element[1])
        : [0, 0, 0, 0] });
    }
  }, [votingInfo]);

  const AnswerPostVoting = () => {
    if (votingInfo?.studentVotes.length === 0) {
      votingCreate?.studentVotingCreate(formData);
    } else {
      votingEdit?.studentVotingRevote(formData);
    }
  };

  useEffect(
    () => {
      if (votingCreate?.data) {
        addInfo('Ви успішно проголосували.');
      }
      if (votingEdit?.data) {
        addInfo('Ви успішно змінили свій вибір.');
      }
    },
    [votingCreate?.data, votingEdit?.data],
  );

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      courses: formData.courses.map((course, index) => (
        index === +e.target.name ? +e.currentTarget.value : course)),
    });
  };

  return (
    <Layout>
      <div className={styles.contentVoting}>
        <TitlePage
          title={`${votingInfo?.isRevote ? 'Переголосування' : 'Голосування'}${isDraw ? getVoting?.data
            ? (`. Ви можете змінити вибір до: ${moment(votingInfo?.endDate).format('DD.MM.YYYY HH:mm')}`)
            : '' : ''}`}
        />
        {isLoading ? <Preloader /> : (
          isDraw ? (
            <>
              <h1 className={clsx(pagestyles.title, styles.firstTitle)}>Вибірковий профільний предмет(I семестр)</h1>
              <Table
                dataHeader={dataHeader}
                dataRow={votingInfo?.requiredCourses
                  .filter((item) => item.semester === 1)
                  .map((course) => ({ list: [
                    { id: 1,
                      label: <input
                        type="radio"
                        name="0"
                        checked={course.id === formData.courses[0]}
                        value={course.id}
                        onChange={handleRadioClick}
                        disabled={votingInfo.isRevote && !!votingInfo.studentVotes
                          .filter((el) => votingInfo.requiredCourses
                            .filter((sem) => sem.semester === 1)
                            .map((element) => element.id)
                            .filter((i) => votingInfo.approveCourse.includes(i)).includes(el[1])).length}
                      /> },
                    { id: 2, label: course.name },
                    { id: 3,
                      label: `${course?.teacher?.lastName}
                   ${course?.teacher?.firstName}
                    ${course?.teacher?.patronymic}`
                        || 'Викладач невідомий' },
                    { id: 4, label: course.credits },
                    { id: 5, label: course.lectureHours },
                  ],
                  key: course.id })) || []}
                gridColumns={styles.columns}
                isTableVoting
              />
              <h1 className={pagestyles.title}>Вибірковий непрофільний предмет(I семестр)</h1>
              <Table
                dataHeader={dataHeader}
                dataRow={votingInfo?.notRequiredCourses
                  .filter((item) => item.semester === 1)
                  .map((course) => ({ list: [
                    { id: 1,
                      label: <input
                        type="radio"
                        name="1"
                        checked={course.id === formData.courses[1]}
                        value={course.id}
                        onChange={handleRadioClick}
                        disabled={votingInfo.isRevote && !!votingInfo.studentVotes
                          .filter((el) => votingInfo.notRequiredCourses
                            .filter((sem) => sem.semester === 1)
                            .map((element) => element.id)
                            .filter((i) => votingInfo.approveCourse.includes(i)).includes(el[1])).length}
                      /> },
                    { id: 2, label: course.name },
                    { id: 3,
                      label: `${course?.teacher?.lastName}
                   ${course?.teacher?.firstName}
                    ${course?.teacher?.patronymic}`
                        || 'Викладач невідомий' },
                    { id: 4, label: course.credits },
                    { id: 5, label: course.lectureHours },
                  ],
                  key: course.id })) || []}
                gridColumns={styles.columns}
                isTableVoting
              />
              <h1 className={pagestyles.title}>Вибірковий профільний предмет(II семестр)</h1>
              <Table
                dataHeader={dataHeader}
                dataRow={votingInfo?.requiredCourses
                  .filter((item) => item.semester === 2)
                  .map((course) => ({ list: [
                    { id: 1,
                      label: <input
                        type="radio"
                        name="2"
                        checked={course.id === formData.courses[2]}
                        value={course.id}
                        onChange={handleRadioClick}
                        disabled={votingInfo.isRevote && !!votingInfo.studentVotes
                          .filter((el) => votingInfo.requiredCourses
                            .filter((sem) => sem.semester === 2)
                            .map((element) => element.id)
                            .filter((i) => votingInfo.approveCourse.includes(i)).includes(el[1])).length}
                      /> },
                    { id: 2, label: course.name },
                    { id: 3,
                      label: `${course?.teacher?.lastName}
                   ${course?.teacher?.firstName}
                    ${course?.teacher?.patronymic}`
                        || 'Викладач невідомий' },
                    { id: 4, label: course.credits },
                    { id: 5, label: course.lectureHours },
                  ],
                  key: course.id })) || []}
                gridColumns={styles.columns}
                isTableVoting
              />
              <h1 className={pagestyles.title}>Вибірковий непрофільний предмет(II семестр)</h1>
              <Table
                dataHeader={dataHeader}
                dataRow={votingInfo?.notRequiredCourses
                  .filter((item) => item.semester === 2)
                  .map((course) => ({ list: [
                    { id: 1,
                      label: <input
                        type="radio"
                        name="3"
                        checked={course.id === formData.courses[3]}
                        value={course.id}
                        onChange={handleRadioClick}
                        disabled={votingInfo.isRevote && !!votingInfo.studentVotes
                          .filter((el) => votingInfo.notRequiredCourses
                            .filter((sem) => sem.semester === 2)
                            .map((element) => element.id)
                            .filter((i) => votingInfo.approveCourse.includes(i)).includes(el[1])).length}
                      /> },
                    { id: 2, label: course.name },
                    { id: 3,
                      label: `${course?.teacher?.lastName}
                   ${course?.teacher?.firstName}
                    ${course?.teacher?.patronymic}`
                      || 'Викладач невідомий' },
                    { id: 4, label: course.credits },
                    { id: 5, label: course.lectureHours },
                  ],
                  key: course.id })) || []}
                gridColumns={styles.columns}
                isTableVoting
              />
              <div className={clsx(styles.voting_footer, isPhone && styles.voting_footer_phone)}>
                <Button
                  onClick={AnswerPostVoting}
                  size="large"
                  nameClass="primary"
                  className={clsx(styles.submitButton, isPhone && styles.submitButton_phone)}
                  disabled={formData.courses.includes(0)
                    || compare(formData.courses.map((item) => item), votingInfo.studentVotes.map((el) => el[1]))}
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
            )
        )}
      </div>
    </Layout>
  );
};

export default VotingStudents;

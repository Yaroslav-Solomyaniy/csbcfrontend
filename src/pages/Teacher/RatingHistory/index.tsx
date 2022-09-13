import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IEditModal } from '../../../types';
import Table from '../../../components/common/table';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
import { useEstimatesContext } from '../../../context/estimates';
import { useTeacherPageContext } from '../../../context/pageTeacher';
import { IGetHistoryGradesData } from '../../../hooks/useGradesHistory';
import pagesStyle from '../../pagesStyle.module.scss';
import Button from '../../../components/common/Button';
import { Delete, Edit } from '../../../components/common/Icon';
import { IGetCuratorData } from '../../../hooks/useCurators';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Дата' },
  { id: 3, label: 'Оцінка' },
  { id: 2, label: 'Причина зміни' },
  { id: 3, label: 'Хто змінив' },
];

interface typeInfoRow{
  firstName: string;
  lastName: string;
  patronymic: string;
  groupName: string;
  courseId: number;
  studentId: number;
}
const infoRowInitialization: typeInfoRow = {
  firstName: '',
  lastName: '',
  patronymic: '',
  groupName: '',
  studentId: 0,
  courseId: 0,
};

const formInitialData = {
  gradesHistories: [],
  // id: 0,
  // grade: 0,
  // course: {
  //   id: 0,
  //   name: '',
  // },
  // userChanged: {
  //   id: 0,
  //   firstName: '',
  //   lastName: '',
  //   patronymic: '',
  // },
  // createdAt: '',
  // reasonOfChange: '',
};

export const TeacherRatingHistory = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const { teacherDataGetById, getHistory } = useTeacherPageContext();
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState(formInitialData);
  const [infoRow, setInfoRow] = useState<typeInfoRow>(infoRowInitialization);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const handleClose = () => {
    closeModal();
  };

  useEffect(() => {
    if (studentId) {
      teacherDataGetById?.pageTeacherGetById(studentId);
    }
  }, [studentId]);

  useEffect(() => {
    setInfoRow({ firstName: teacherDataGetById?.data?.student.user.firstName || '',
      patronymic: teacherDataGetById?.data?.student.user.patronymic || '',
      lastName: teacherDataGetById?.data?.student.user.lastName || '',
      courseId: teacherDataGetById?.data?.course.id || 0,
      groupName: teacherDataGetById?.data?.student.group.name || '',
      studentId: teacherDataGetById?.data?.student.id || 0,
    });
    // setTimeout(() => {

    // }, 250);
  }, [teacherDataGetById?.data]);

  useEffect(
    () => {
      if (infoRow.studentId !== 0 && infoRow.courseId !== 0) {
        getHistory?.getHistoryGrades({ studentId: infoRow.studentId, courseId: infoRow.courseId });
      }
    },
    [infoRow],
  );

  useEffect(() => {
    if (getHistory?.data) {
      // setFormData({ ...formData, gradesHistories: ...getHistory.data.gradesHistories });
    }
  }, [getHistory?.data]);

  // useEffect(()=>{
  //     setDataRow(formData.gradesHistories.map((item) => ({
  //       list: [
  //         { id: 1, label: item.course.name },
  //         { id: 2, label: moment(item.createdAt).format('DD.MM.yyyy') },
  //         { id: 3, label: item.grade },
  //         { id: 4, label: item.reasonOfChange },
  //         { id: 5, label: `${item.userChanged.lastName}
  //         ${item.userChanged.firstName}
  //         ${item.userChanged.patronymic}` },
  //       ],
  //       key: item.id,
  //     })));
  //   }}
  // },[formData])

  return (
    <ModalWindow modalTitle="Історія змін оцінок" active={modalActive} closeModal={handleClose}>
      <div className={styles.infoBlock}>
        <div className={styles.subtitle}>
          {infoRow.lastName}
          {' '}
          {infoRow.firstName}
          {' '}
          {infoRow.patronymic}
          ,
          {' '}
          {infoRow.groupName}
        </div>
        <Table
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
        />
      </div>
      <ModalControlButtons
        handleClose={handleClose}
        cancelButtonText="Назад"
      />
    </ModalWindow>
  );
};

export default TeacherRatingHistory;

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import Table from '../../../components/common/table';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
import { useTeacherPageContext } from '../../../context/pageTeacher';

const dataHeader: ITableHeader[] = [
  // { id: 1, label: 'Предмет' },
  { id: 1, label: 'Дата' },
  { id: 2, label: 'Оцінка' },
  { id: 3, label: 'Причина зміни' },
  { id: 4, label: 'Хто змінив' },
];

interface typeInfoStudent {
  firstName: string;
  lastName: string;
  patronymic: string;
  groupName: string;
  courseId: number;
  studentId: number;
  courseName: string;
}

const infoRowInitialization: typeInfoStudent = {
  firstName: '',
  lastName: '',
  patronymic: '',
  groupName: '',
  studentId: 0,
  courseId: 0,
  courseName: '',
};

interface ITeacherRatingHistory {
  modalActive: boolean;
  closeModal: () => void;
  Id: number;
}

export const TeacherRatingHistory = ({ modalActive, closeModal, Id }: ITeacherRatingHistory): JSX.Element => {
  const [infoRow, setInfoRow] = useState<typeInfoStudent>(infoRowInitialization);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const { teacherDataGetById, getHistory } = useTeacherPageContext();

  const handleClose = () => {
    closeModal();
  };

  useEffect(() => {
    if (Id) {
      teacherDataGetById?.pageTeacherGetById(Id);
    }
  }, [Id]);

  useEffect(() => {
    setInfoRow({
      firstName: teacherDataGetById?.data?.student.user.firstName || '',
      patronymic: teacherDataGetById?.data?.student.user.patronymic || '',
      lastName: teacherDataGetById?.data?.student.user.lastName || '',
      courseId: teacherDataGetById?.data?.course.id || 0,
      groupName: teacherDataGetById?.data?.student.group.name || '',
      studentId: teacherDataGetById?.data?.student.id || 0,
      courseName: teacherDataGetById?.data?.course.name || '',
    });
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
      setDataRow(getHistory.data.reduce((acc: ITableRowItem[], historyGrades) => {
        const items: ITableRowItem[] = historyGrades.gradesHistories.map((history): ITableRowItem => ({

          key: history.id,
          list: [
            { id: 1, label: moment(history.createdAt).format('DD.MM.yyyy') },
            { id: 2, label: history.grade },
            { id: 3, label: history.reasonOfChange },
            { id: 4,
              label: `${history.userChanged.lastName}
             ${history.userChanged.firstName[0]}.
             ${history.userChanged.patronymic[0]}.` },
          ],

        }));

        return [...acc, ...items];
      }, []));
    }
  }, [getHistory?.data]);

  return (
    <ModalWindow modalTitle="Історія змін оцінки" active={modalActive} closeModal={handleClose}>
      <div className={styles.infoBlock}>
        <div className={styles.subtitle}>
          {`${infoRow.lastName} ${infoRow.firstName} ${infoRow.patronymic}, ${infoRow.groupName}`}
        </div>
        <div className={styles.subtitle}>
          {`Предмет: ${infoRow.courseName}`}
        </div>
        <Table
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          isTableResult
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

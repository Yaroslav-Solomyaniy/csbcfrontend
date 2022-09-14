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
import { IGetHistoryGradesData, IGradesHistories } from '../../../hooks/useGradesHistory';
import pagesStyle from '../../pagesStyle.module.scss';
import Button from '../../../components/common/Button';
import { Delete, Edit, History } from '../../../components/common/Icon';
import { IGetCuratorData } from '../../../hooks/useCurators';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Дата' },
  { id: 3, label: 'Оцінка' },
  { id: 4, label: 'Причина зміни' },
  { id: 5, label: 'Хто змінив' },
];

interface typeInfoStudent{
  firstName: string;
  lastName: string;
  patronymic: string;
  groupName: string;
  courseId: number;
  studentId: number;
}
const infoRowInitialization: typeInfoStudent = {
  firstName: '',
  lastName: '',
  patronymic: '',
  groupName: '',
  studentId: 0,
  courseId: 0,
};

interface ITeacherRatingHistory{
  modalActive: boolean;
  closeModal: () => void;
  Id: number;
}
export const TeacherRatingHistory = ({ modalActive, closeModal, Id }: ITeacherRatingHistory): JSX.Element => {
  const [infoRow, setInfoRow] = useState<typeInfoStudent>(infoRowInitialization);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [formData, setFormData] = useState<IGetHistoryGradesData[]>([]);

  const { teacherDataGetById, getHistory } = useTeacherPageContext();
  const { addInfo } = useMessagesContext();

  const handleClose = () => {
    closeModal();
  };

  useEffect(() => {
    if (Id) {
      teacherDataGetById?.pageTeacherGetById(Id);
    }
  }, [Id]);

  useEffect(() => {
    setInfoRow({ firstName: teacherDataGetById?.data?.student.user.firstName || '',
      patronymic: teacherDataGetById?.data?.student.user.patronymic || '',
      lastName: teacherDataGetById?.data?.student.user.lastName || '',
      courseId: teacherDataGetById?.data?.course.id || 0,
      groupName: teacherDataGetById?.data?.student.group.name || '',
      studentId: teacherDataGetById?.data?.student.id || 0,
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

  // useEffect(() => {
  //   const data:ITableRowItem[] = getHistory.data.reduce((ak, i):ITableRowItem[] => [...ak, ...i.gradesHistories.map((item):ITableRowItem => ({
  //     list: [
  //       { id: 1, label: 'hi' },
  //       { id: 2, label: 'hi' },
  //       { id: 3, label: 'hi' },
  //       { id: 4, label: 'hi' },
  //       { id: 5, label: 'hi' },
  //     ],
  //     key: item.id,
  //   }))], []);
  // }, [getHistory?.data]);

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

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import ModalWindow from '../../../../components/common/ModalWindow';
import { ITableHeader } from '../../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { TeacherContext } from '../../../../context/PageInTeacher/Teacher';
import RatingHistory from './Components/RatingHistory';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Дата' },
  { id: 2, label: 'Оцінка' },
  { id: 3, label: 'Причина зміни' },
  { id: 4, label: 'Хто змінив' },
];

export interface typeInfoStudent {
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
  semester?: string;
  modalActive: boolean;
  closeModal: () => void;
  Id: number;
}

export const TeacherRatingHistory = ({ modalActive, closeModal, Id, semester }: ITeacherRatingHistory): JSX.Element => {
  const [infoRow, setInfoRow] = useState<typeInfoStudent>(infoRowInitialization);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const { teacherDataGetById, getHistory } = TeacherContext();

  const handleClose = () => {
    closeModal();
    setInfoRow(infoRowInitialization);
  };

  useEffect(() => {
    if (modalActive) {
      disableBodyScroll(document.body);
    } else {
      (
        enableBodyScroll(document.body)
      );
    }
  }, [modalActive]);

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
        getHistory?.getHistoryGrades({
          studentId: infoRow.studentId,
          courseId: infoRow.courseId,
          semester: semester ? +semester : undefined,
        });
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
            {
              id: 4,
              label: `${history.userChanged.lastName}
             ${history.userChanged.firstName[0]}.
             ${history.userChanged.patronymic[0]}.`,
            },
          ],

        }));

        return [...acc, ...items];
      }, []));
    }
  }, [getHistory?.data]);

  return (
    <ModalWindow modalTitle="Історія змін оцінки" active={modalActive} closeModal={handleClose}>
      <RatingHistory
        infoRow={infoRow}
        dataHeader={dataHeader}
        dataRow={dataRow}
        closeModal={handleClose}
      />
    </ModalWindow>
  );
};

TeacherRatingHistory.defaultProps = {
  semester: undefined,
};

export default TeacherRatingHistory;

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import styles from './index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import pageStyles from '../../pagesStyle.module.scss';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
import { useTeacherPageContext } from '../../../context/pageTeacher';
import RatingHistory from './Components/RatingHistory';
import { useDeviceContext } from '../../../context/TypeDevice';
import MobileModalWindow from '../../../components/common/MobileModalWindow';
import { IGetHistoryGradesData, IGradesHistories, IUseGetHistoryGrades } from '../../../hooks/useGradesHistory';

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
  modalActive: boolean;
  closeModal: () => void;
  Id: number;
}

export const TeacherRatingHistory = ({ modalActive, closeModal, Id }: ITeacherRatingHistory): JSX.Element => {
  const [infoRow, setInfoRow] = useState<typeInfoStudent>(infoRowInitialization);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [data, setData] = useState<IGradesHistories[]>([]);
  const { isDesktop, isTablet, isPhone } = useDeviceContext();
  const { teacherDataGetById, getHistory } = useTeacherPageContext();

  const handleClose = () => {
    closeModal();
    setInfoRow(infoRowInitialization);
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
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Історія змін оцінки" active={modalActive} closeModal={handleClose}>
          <RatingHistory
            infoRow={infoRow}
            dataHeader={dataHeader}
            dataRow={dataRow}
            closeModal={handleClose}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
      <MobileModalWindow isActive={modalActive}>
        { modalActive ? disableBodyScroll(document.body) : enableBodyScroll(document.body) }
        <RatingHistory
          modalTitle="Історія змін оцінки"
          infoRow={infoRow}
          dataHeader={dataHeader}
          dataRow={dataRow}
          closeModal={handleClose}
        />
      </MobileModalWindow>
      )}
    </>
  );
};

export default TeacherRatingHistory;

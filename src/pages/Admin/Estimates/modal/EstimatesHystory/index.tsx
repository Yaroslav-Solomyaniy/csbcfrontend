import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import styles from '../../../../pagesStyle.module.scss';
import ModalWindow from '../../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../../../types';
import Table from '../../../../../components/common/Table';
import { ITableHeader } from '../../../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { useGetHistoryGrades } from '../../../../../hooks/All/useGradesHistory';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Дата' },
  { id: 3, label: 'Оцінка' },
  { id: 4, label: 'Причина зміни' },
  { id: 5, label: 'Хто змінив' },
];

export const EstimatesHistory = ({ modalActive, closeModal, studentId, semester }: IEditModal): JSX.Element => {
  const { getHistoryGrades, data } = useGetHistoryGrades();
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
  };

  useEffect(() => {
    if (data) {
      setDataRow(data.reduce((acc: ITableRowItem[], historyGrades) => {
        const items: ITableRowItem[] = historyGrades.gradesHistories.map((history): ITableRowItem => ({

          key: history.id,
          list: [
            { id: 1, label: history.course.name },
            { id: 2, label: moment(history.createdAt).format('DD.MM.yyyy') },
            { id: 3, label: history.grade },
            { id: 4, label: history.reasonOfChange },
            {
              id: 5,
              label: `${history.userChanged.lastName}
             ${history.userChanged.firstName[0]}.
             ${history.userChanged.patronymic[0]}.`,
            },
          ],

        }));

        return [...acc, ...items];
      }, []));
    }
  }, [data]);

  useEffect(() => {
    if (studentId) {
      getHistoryGrades({ studentId, semester: semester ? +semester : undefined });
    }
  }, [studentId, semester]);

  return (
    <ModalWindow modalTitle="Історія змін оцінки" active={modalActive} closeModal={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>
        {data[0]?.user && (
          <p className={styles.subtitle}>
            {`${data[0]?.user.lastName}
      ${data[0]?.user.firstName}
      ${data[0]?.user.patronymic}
      , ${data[0]?.group.name} ${semester ? `, ${+semester} семестр` : ''}`}
          </p>
        )}
        <Table
          gridColumns={styles.columns}
          dataRow={dataRow}
          dataHeader={dataHeader}
          isHistoryTable
          heightVH="50vh"
        />
      </form>
      <ModalControlButtons
        onSubmit={closeModal}
        mainButtonText="Назад"
      />
    </ModalWindow>
  );
};

export default EstimatesHistory;

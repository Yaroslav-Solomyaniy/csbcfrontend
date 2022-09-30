import React, { useEffect, useState } from 'react';
import styles from '../../../../pagesStyle.module.scss';
import ModalWindow from '../../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../../../types';
import Table from '../../../../../components/common/Table';
import { ITableHeader } from '../../../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { EstimatesContext } from '../../../../../context/PagesInAdmin/Estimates';
import { IGradesHistoryGetIdDataGradesHistories } from '../../../../../hooks/PagesInAdmin/useEstimates';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Дта' },
  { id: 3, label: 'Оцінка' },
  { id: 4, label: 'Причина зміни' },
  { id: 5, label: 'Хто змінив' },
];

export const EstimatesHistory = ({ modalActive, closeModal, studentId, semester }: IEditModal): JSX.Element => {
  const { gradesHistoryGet } = EstimatesContext();
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const handleClose = () => {
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
  };

  const tableRows = (arrTableRows: IGradesHistoryGetIdDataGradesHistories[]) => (
    arrTableRows.length ? arrTableRows.map((course: IGradesHistoryGetIdDataGradesHistories) => ({
      list: [
        { id: 1, label: course.course.name },
        { id: 2, label: course.createdAt },
        { id: 3, label: course.grade },
        { id: 4, label: course.reasonOfChange },
        {
          id: 5,
          label: `${course.userChanged.lastName}
          ${course.userChanged.firstName[0].toUpperCase()}
          ${course.userChanged.patronymic[0].toUpperCase()}`,
        },
      ],
      key: course.id,
    })) : []);

  useEffect(() => {
    if (gradesHistoryGet?.data) {
      setDataRow(tableRows(gradesHistoryGet.data.gradesHistories));
    }
  }, [gradesHistoryGet?.data]);

  useEffect(() => {
    if (studentId && semester) {
      gradesHistoryGet?.getGradesHistory({ semester: +semester }, studentId);
    }
  }, [studentId, semester]);

  return (
    <ModalWindow modalTitle="Історія змін оцінки" active={modalActive} closeModal={handleClose}>

      <p className={styles.text}>
        {`${gradesHistoryGet?.data?.user.lastName}
      ${gradesHistoryGet?.data?.user.firstName}
      ${gradesHistoryGet?.data?.user.patronymic}
      , ${gradesHistoryGet?.data?.group.name}, ${semester} семестр`}
      </p>

      <Table
        gridColumns={styles.columns}
        dataRow={dataRow}
        dataHeader={dataHeader}
      />

      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Видалити"
      />
    </ModalWindow>
  );
};

export default EstimatesHistory;

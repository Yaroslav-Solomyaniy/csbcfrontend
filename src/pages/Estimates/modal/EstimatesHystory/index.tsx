import React, { useEffect, useState } from 'react';
import styles from '../../../pagesStyle.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../../types';
import Table from '../../../../components/common/table';
import { ITableHeader } from '../../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../../components/common/table/TableBody';
import { useEstimatesContext } from '../../../../context/estimates';
import { IGradesHistoryGetIdData } from '../../../../hooks/useEstimates';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Дта' },
  { id: 3, label: 'Оцінка' },
  { id: 4, label: 'Причина зміни' },
  { id: 5, label: 'Хто змінив' },
];

export const EstimatesHistory = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const { gradeshistoryGet } = useEstimatesContext();
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const handleClose = () => {
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
  };

  const tableRows = (arrTableRows: IGradesHistoryGetIdData[]) => (
    arrTableRows.length ? arrTableRows.map((course: IGradesHistoryGetIdData) => ({
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
    if (gradeshistoryGet?.data) {
      // setDataRow(tableRows(gradeshistoryGet?.data.items));
      setDataRow(tableRows([]));
    }
  }, [gradeshistoryGet?.data]);

  useEffect(() => {
    if (studentId) {
      gradeshistoryGet?.getGradesHistory({ studentId });
    }
  }, [studentId]);

  return (
    <ModalWindow modalTitle="Історія змін оцінки" active={modalActive} closeModal={handleClose}>

      <h3 className={styles.subtitle}>!!!</h3>

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

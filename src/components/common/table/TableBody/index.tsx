import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import TableFooter from '../TableFooter';

export interface ITableRow {
  id: number;
  name: string;
  curator: string;
  order_number: string;
  studentValue: number;
  actions: JSX.Element | undefined | string;
}

interface ITableBody {
  dataRow: ITableRow[];
  gridColumns: string;
}

const TableBody = ({ dataRow, gridColumns }: ITableBody): JSX.Element => (
  <>
    <div className={styles.content}>
      {dataRow.map((item) => (
        <div className={clsx(styles.body__row, gridColumns)} key={item.id}>
          <div className={styles.body__row_item}>{item.name}</div>
          <div className={styles.body__row_item}>{item.curator}</div>
          <div className={styles.body__row_item}>{item.order_number}</div>
          <div className={styles.body__row_item}>{item.studentValue}</div>
          <div className={styles.body__row_item}>{item.actions}</div>
        </div>
      ))}
    </div>
    <TableFooter />
  </>
);

export default TableBody;

import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import TableFooter from '../TableFooter';

interface ITableBody<DR> {
  gridColumns: string;
  dataRow: DR[];
}

function TableBody<DR>({ dataRow, gridColumns }: ITableBody<DR>): JSX.Element {
  return (
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
}

export default TableBody;

import React from 'react';
import clsx from 'clsx';

import TableFooter from '../TableFooter';

import styles from './index.module.scss';
import { Pagination } from '../../../../types';

export interface ITableRowItem {
  key: string | number;
  list: {
    id: string | number;
    label: string | JSX.Element;
  }[];
}

interface ITableBody {
  gridColumns: string;
  dataRow: ITableRowItem[];
  pagination: Pagination;
  onPaginationChange: (pagination: Pagination) => void;
}

const TableBody = ({ dataRow, gridColumns, pagination, onPaginationChange }: ITableBody): JSX.Element => (
  <>
    <div className={styles.content}>
      {dataRow.map(({ key, list }) => (
        <div className={clsx(styles.body__row, gridColumns)} key={key}>
          {list.map(({ id, label }) => (
            <div className={styles.body__row_item} key={id}>
              {label}
            </div>
          ))}
        </div>
      ))}
    </div>
    <TableFooter pagination={pagination} onPaginationChange={onPaginationChange} />
  </>
);

export default TableBody;

import React from 'react';
import clsx from 'clsx';

import TableFooter from '../TableFooter';

import styles from './index.module.scss';
import { Pagination } from '../../../../types';

export interface ITableRowItem {
  key: string | number;
  list: {
    id: string | number;
    label: string[] | string | number | JSX.Element;
  }[];
}

interface ITableBody {
  gridColumns: string;
  dataRow: ITableRowItem[];
  pagination: Pagination;
  onPaginationChange: (pagination: Pagination) => void;
  isScroll?: boolean;
}

const TableBody = ({ dataRow, gridColumns, pagination, onPaginationChange, isScroll }: ITableBody): JSX.Element => (
  <>
    <div className={styles.content}>
      {dataRow.map(({ key, list }) => (
        <div className={clsx(styles.body__row, gridColumns)} key={key}>
          {list.map(({ id, label }) => (
            <div className={clsx(styles.body__row__item, 'clip')} key={id}>
              {Array.isArray(label) ? (
                label.map((el) => (
                  <div className={clsx(styles.body__row__item__string, 'clip')} key={`${id}${el}`}>
                    {el}
                  </div>
                ))
              ) : (
                <div className={clsx(styles.body__row__item__string, 'clip')} key={`${id}${label}`}>
                  {label}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
    <TableFooter pagination={pagination} onPaginationChange={onPaginationChange} />
  </>
);

TableBody.defaultProps = {
  isScroll: false,
};

export default TableBody;

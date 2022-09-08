import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

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
  isScroll?: boolean;
  columScrollHorizontal?: number;
  isTableResult?: boolean;
}

const TableBody = ({ dataRow, gridColumns,
  isScroll, columScrollHorizontal, isTableResult }: ITableBody): JSX.Element => (
    <div className={clsx(isTableResult && styles.tableResult, styles.content)}>
      {dataRow.map(({ key, list }) => (
        <div
          className={clsx(isTableResult && styles.body__row_noBorder, styles.body__row, gridColumns)}
          key={key}
          style={isScroll ? {
            gridTemplateColumns: `15% 10% repeat(${columScrollHorizontal}, ${
              columScrollHorizontal
                ? columScrollHorizontal > 6 ? 10 : 55 / columScrollHorizontal : 55}%) 7%`,
          } : {}}
        >
          {list.map(({ id, label }) => (
            <div className={clsx(styles.body__row__item, 'clip', isScroll && styles.body__row__item__scroll)} key={id}>
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
);

TableBody.defaultProps = {
  pagination: null,
  onPaginationChange: undefined,
  isScroll: false,
  columScrollHorizontal: 0,
  isTableResult: false,
};

export default TableBody;

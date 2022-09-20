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
  isHistoryTable?: boolean;
}

const TableBody = ({
  dataRow, gridColumns,
  isScroll, columScrollHorizontal, isTableResult,
  isHistoryTable,
}: ITableBody): JSX.Element => (
  <div className={clsx(isTableResult && styles.tableResult, isHistoryTable && styles.historyTable, styles.content)}>
    {dataRow.map(({ key, list }) => (
      <div
        className={clsx(isTableResult && styles.body__row_noBorder, styles.body__row, gridColumns)}
        key={key}
        style={isScroll ? {
          gridTemplateColumns: `16% 9% 9% repeat(${columScrollHorizontal}, ${
            columScrollHorizontal
              ? columScrollHorizontal > 6 ? 10 : 55 / columScrollHorizontal : 55}%) 10%`,
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
  isHistoryTable: false,
};

export default TableBody;

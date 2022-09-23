import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import TableBody, { ITableRowItem } from './TableBody';
import TableFilter from './TableFilter';
import TableHeader, { ITableHeader } from './TableHeader';
import { Pagination } from '../../../types';
import TableFooter from './TableFooter';

interface ITable {
  dataHeader: ITableHeader[] | [];
  dataRow: ITableRowItem[] | [];
  gridColumns: string;
  filter?: JSX.Element | undefined;
  columScrollHorizontal?: number;
  isScroll?: boolean;
  isTableResult?: boolean;
  isHistoryTable?: boolean;
  pagination?: Pagination;
  totalItems?: number;
}

const Table = ({
  dataHeader,
  dataRow,
  gridColumns,
  isTableResult,
  filter,
  totalItems,
  isHistoryTable,
  columScrollHorizontal,
  isScroll,
}: ITable): JSX.Element => (
  <>
    <TableFilter filter={filter} />
    <div className={styles.table}>
      <div className={clsx(isScroll && styles.table__scroll)}>
        <TableHeader
          dataHeader={dataHeader}
          gridColumns={gridColumns}
          isScroll={isScroll}
          columScrollHorizontal={columScrollHorizontal}
        />
        {dataRow.length
          ? (
            <TableBody
              columScrollHorizontal={columScrollHorizontal}
              isScroll={isScroll}
              dataRow={dataRow}
              gridColumns={gridColumns}
              isTableResult={isTableResult}
              isHistoryTable={isHistoryTable}
            />
          )
          : <div className={styles.table__not_found}>Нічого не знайдено</div>}
      </div>
      {!!dataRow.length && totalItems ? <TableFooter totalItems={totalItems} /> : ''}
    </div>
  </>
);

Table.defaultProps = {
  pagination: null,
  filter: <div />,
  isScroll: false,
  columScrollHorizontal: 0,
  isTableResult: false,
  isHistoryTable: false,
  totalItems: 0,
};

export default Table;

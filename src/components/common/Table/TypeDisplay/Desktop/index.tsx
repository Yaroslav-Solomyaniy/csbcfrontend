import React from 'react';
import clsx from 'clsx';
import styles from '../../index.module.scss';
import TableHeader, { ITableHeader } from './TableHeader';
import TableBody, { ITableRowItem } from './TableBody';
import TableFooter from './TableFooter';

interface IDesktopTable {
  dataHeader: ITableHeader[] | [];
  dataRow: ITableRowItem[] | [];
  gridColumns: string;
  columScrollHorizontal?: number;
  isScroll?: boolean;
  isTableResult?: boolean;
  isHistoryTable?: boolean;
  totalItems?: number;
}

const DesktopTable = ({
  dataHeader,
  dataRow,
  isTableResult,
  isHistoryTable,
  columScrollHorizontal,
  isScroll,
  gridColumns,
  totalItems,
}: IDesktopTable) => (
  <div className={clsx(styles.table, !totalItems && styles.tableNoPagination)}>
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
);

DesktopTable.defaultProps = {
  isScroll: false,
  columScrollHorizontal: 0,
  isTableResult: false,
  isHistoryTable: false,
  totalItems: 0,
};

export default DesktopTable;

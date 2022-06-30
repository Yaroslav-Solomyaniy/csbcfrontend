import React from 'react';
import styles from './index.module.scss';
import TableBody, { ITableRowItem } from './TableBody';
import TableFilter, { IFilterOptions } from './TableFilter';
import TableHeader, { ITableHeader } from './TableHeader';

interface ITable {
  dataHeader: ITableHeader[];
  dataRow: ITableRowItem[];
  gridColumns: string;
  filter: IFilterOptions[];
}

const Table = ({ dataHeader, dataRow, gridColumns, filter }: ITable): JSX.Element => (
  <>
    <TableFilter filters={filter} />
    <div className={styles.table}>
      <TableHeader dataHeader={dataHeader} gridColumns={gridColumns} />
      {dataRow.length
        ? <TableBody dataRow={dataRow} gridColumns={gridColumns} />
        : <div className={styles.table__not_found}>Нічого не знайдено</div>}
    </div>
  </>
);

export default Table;

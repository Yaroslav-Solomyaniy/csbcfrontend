import React from 'react';
import styles from './index.module.scss';
import TableBody from './TableBody';
import TableFilter, { IFilterOptions } from './TableFilter';
import TableHeader, { ITableHeader } from './TableHeader';

interface ITable<DR> {
  dataHeader: ITableHeader[];
  dataRow: DR[];
  gridColumns: string;
  filter: IFilterOptions[];
}

function Table<DR>({ dataHeader, dataRow, gridColumns, filter }: ITable<DR>): JSX.Element {
  return (
    <>
      <TableFilter filters={filter} />
      <div className={styles.table}>
        <TableHeader dataHeader={dataHeader} gridColumns={gridColumns} />
        {dataRow.length
          ? <TableBody<DR> dataRow={dataRow} gridColumns={gridColumns} />
          : <div className={styles.table__not_found}>Нічого не знайдено</div>}
      </div>
    </>
  );
}

export default Table;

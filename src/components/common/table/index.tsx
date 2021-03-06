import React from 'react';
import styles from './index.module.scss';
import TableBody, { ITableRowItem } from './TableBody';
import TableFilter from './TableFilter';
import TableHeader, { ITableHeader } from './TableHeader';
import { Pagination } from '../../../types';

interface ITable {
  dataHeader: ITableHeader[];
  dataRow: ITableRowItem[];
  gridColumns: string;
  filter?: JSX.Element;
  pagination: Pagination;
  onPaginationChange: (pagination: Pagination) => void;
}

const Table = ({ dataHeader, dataRow, gridColumns, filter, pagination, onPaginationChange }: ITable): JSX.Element => (
  <>
    <TableFilter filter={filter} />
    <div className={styles.table}>
      <TableHeader dataHeader={dataHeader} gridColumns={gridColumns} />
      {dataRow.length
        ? (
          <TableBody
            dataRow={dataRow}
            gridColumns={gridColumns}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
          />
        )
        : <div className={styles.table__not_found}>Нічого не знайдено</div>}
    </div>
  </>
);

Table.defaultProps = {
  filter: <div />,
};

export default Table;

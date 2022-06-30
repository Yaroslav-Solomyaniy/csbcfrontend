import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export interface ITableHeader {
  id: number;
  label: string;
}

interface IDataHeader {
  dataHeader: ITableHeader[];
  gridColumns: string;
}

const TableHeader = ({ dataHeader, gridColumns }: IDataHeader): JSX.Element => (
  <div className={clsx(styles.header, gridColumns)}>
    {dataHeader.map((item) => (
      <div className={styles.header__item} key={item.id}>{item.label}</div>
    ))}
  </div>
);

export default TableHeader;

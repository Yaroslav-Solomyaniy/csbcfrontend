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
  columScrollHorizontal?: number;
  isScroll?: boolean;
}

const TableHeader = ({ dataHeader, gridColumns, isScroll, columScrollHorizontal }: IDataHeader): JSX.Element => (
  <div
    className={clsx(styles.header, isScroll && styles.header__scroll, !isScroll && gridColumns)}
    style={isScroll ? {
      gridTemplateColumns: `20% 10% repeat(${columScrollHorizontal}, ${
        columScrollHorizontal
          ? columScrollHorizontal > 6
            ? 10
            : 55 / columScrollHorizontal
          : 55
      }%) 15%`,
    } : {}}
  >
    {dataHeader.map((item) => (
      <div className={styles.header__item} key={item.id}>{item.label}</div>
    ))}
  </div>
);

TableHeader.defaultProps = {
  isScroll: false,
  columScrollHorizontal: 0,
};

export default TableHeader;

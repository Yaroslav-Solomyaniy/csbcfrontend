import React from 'react';
import styles from './table.module.scss';

interface TableHeader {
  name: string;
  title: string;
}

interface Table {
  header: TableHeader[];
  list: Record<string, string | number>[];
}

const Table = ({ header }: Table): JSX.Element => (
  <div className={styles.table}>
    {header.map(({ title }) => (
      <div className={styles.table__header} key={title}>{title}</div>
    ))}

    <div className={styles.table__item}>2П-18</div>
    <div className={styles.table__item}>Фай Вікторія Степанівна</div>
    <div className={styles.table__item}>AO23F2</div>
    <div className={styles.table__item}>24</div>
    <div className={styles.table__item}>copm | comp</div>
  </div>
);

export default Table;

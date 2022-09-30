import React from 'react';
import styles from './index.module.scss';

interface ITableFilter {
  filter?: JSX.Element;
}

const TableFilter = ({ filter }: ITableFilter): JSX.Element => (
  <div className={styles.filters}>
    {filter}
  </div>
);

TableFilter.defaultProps = {
  filter: <div />,
};

export default TableFilter;

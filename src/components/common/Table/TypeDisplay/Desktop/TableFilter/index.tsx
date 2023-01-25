import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import { DeviceContext } from '../../../../../../context/All/DeviceType';

interface ITableFilter {
  filter?: JSX.Element;
}

const TableFilter = ({ filter }: ITableFilter): JSX.Element => {
  const { isTablet } = DeviceContext();

  return (
    <div className={clsx(styles.filters, isTablet && styles.tablet_filters)}>
      {filter}
    </div>
  );
};

TableFilter.defaultProps = {
  filter: <div />,
};

export default TableFilter;

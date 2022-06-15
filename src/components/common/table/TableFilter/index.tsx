import React from 'react';
import Select from 'react-select';
import { Option } from '../../../../types';
import styles from './index.module.scss';

export interface IFilterOptions {
  key: string;
  value: Option[];
  placeholder: string;
}

interface ITableFilter{
  filters:IFilterOptions[];
}

const TableFilter = ({ filters }: ITableFilter):JSX.Element => (
  <div className={styles.filters}>
    {filters.map(({ key, value, placeholder }) => (
      <Select
        key={key}
        options={value}
        placeholder={placeholder}
        isClearable
      />
    ))}
  </div>
);

export default TableFilter;

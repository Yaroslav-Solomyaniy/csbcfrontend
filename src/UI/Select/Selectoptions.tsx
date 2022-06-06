import React from 'react';
import Select from 'react-select';
import styles from './Selectoptions.module.scss';
import Group from '../../pages/Group/Group';

export interface IselectOptions{
    select:{
        value:string;
        label:string;
    }[];
    placeholder:string;
    className?:string;
}

const Selectoptions = ({ className, select, placeholder }: IselectOptions):JSX.Element => (
  <div className={`${`${styles.select} ${className}`}`}>
    <Select
      className={styles.customSelect__control}
      options={select}
      placeholder={placeholder}
      classNamePrefix="custom-select"
      isClearable
    />
  </div>
);

Selectoptions.defaultProps = {
  className: '',
};

export default Selectoptions;

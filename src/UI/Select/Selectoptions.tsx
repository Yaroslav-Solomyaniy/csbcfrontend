import React from 'react';
import Select from 'react-select';
import styles from './selectoptions.module.scss';

export interface IselectOptions{
    select:{
        value:string;
        label:string;
    }[];
    placeholder:string;
    className?:string;
}

const Selectoptions = ({ className, select, placeholder }: IselectOptions):JSX.Element => (
  <div className={`${styles.select} ${className}`}>
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

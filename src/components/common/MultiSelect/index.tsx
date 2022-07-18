import React from 'react';
import ReactSelect from 'react-select';

import clsx from 'clsx';
import { Option, SelectType } from '../../../types';
import styles from './index.module.scss';

interface MultiSelect {
  options: Option[];
  type: SelectType;
  value: string[];
  onChange: (value: Option[]) => void;
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
}

const Styles: any = {
  pagination: {
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      borderColor: 'rgba(0,0,0,10%)',
      maxWidth: 75,
      minHeight: '100%',
      height: '32px',
      borderRadius: '8px',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      // padding: '9px 8px 9px 16px',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '32px',
    }),

  },
  filter: {
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      height: '42px',
      borderRadius: '8px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
      '&:active': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '9px 8px 9px 16px',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    menu: (base: any) => ({
      ...base,
      background: 'rgba(215, 231, 244, 1)',
    }),
    menuList: (base: any) => ({
      ...base,
      background: 'white',
    }),
  },
  modal: {
    multiValue: (base: any) => ({
      ...base,
      border: '1px solid black',
      backgroundColor: 'white',
      color: 'black',
      fontSize: '14px',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      backgroundColor: 'white',
      color: 'black',
    }),

    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      borderColor: 'rgba(0,0,0,0.1)',
      height: 'auto',
      minHeight: '32px',
      borderRadius: '8px',
      marginTop: 16,
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
      '&:focus': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
      '&:active': {
        border: '1px solid rgba(39, 111, 173, 1)',
      },
    }),
    menu: (base: any) => ({
      ...base,
      background: 'rgba(215, 231, 244, 1)',
    }),
    menuList: (base: any) => ({
      ...base,
      background: 'white',
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0 16px',
    }),

    input: (provided: any) => ({
      ...provided,
      margin: '0px',
      padding: '0',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
    }),
  },
};

const MultiSelect = ({
  label,
  options,
  value,
  onChange,
  required,
  error,
  placeholder,
  isSearchable,
  isClearable,
  type,
}: MultiSelect): JSX.Element => (

  <div className={styles.wrap}>
    {label && (
    <label className={clsx(styles.label, error && styles.error_label)}>
      {label}
      {required && <span className={styles.required}>*</span>}
    </label>
    )}
    <div className={styles.selectWrap}>
      <ReactSelect
        styles={Styles[type]}
        isSearchable={isSearchable}
        className={styles.select}
        options={options}
        placeholder={placeholder}
        isClearable={isClearable}
        value={options.filter((option) => value.includes(`${option.value}`))}
        onChange={(newValue) => onChange(newValue ? newValue as Option[] : [])}
        isMulti
      />
      {error && (
      <div className={styles.error}>
        <div className={styles.textError}>{error}</div>
      </div>
      )}
    </div>
  </div>
);

MultiSelect.defaultProps = {
  label: '',
  error: '',
  required: false,
  placeholder: '',
  isSearchable: false,
  isClearable: false,
};

export default MultiSelect;

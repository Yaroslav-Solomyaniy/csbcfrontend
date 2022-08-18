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
  modal: {
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      height: 'auto',
      minHeight: '32px',
      borderRadius: '8px',
      marginTop: 16,
      padding: '2px 0',
      color: 'rgba(0, 0, 0, 0.75)',
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
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: 'white',
      fontSize: '14px',
      border: '1px solid  rgba(66, 139, 202, 1)',
      borderRadius: 4,
      margin: '2px 2px',
      minWidth: '45%',
      width: 'auto',
      display: 'flex',
      justifyContent: 'space-Between',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      padding: '2px 5px',
      backgroundColor: 'white',

    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: 'rgba(0, 0, 0, 0.75)',
      '&:hover': {
        color: 'rgba(39, 111, 173, 1)',
      },
    }),
    menu: (base: any) => ({
      ...base,
      background: '#FEFEFE',
      overflow: 'hidden',
    }),
    menuList: (base: any) => ({
      ...base,
      background: '#FEFEFE',
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0 16px',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),

    input: (provided: any) => ({
      ...provided,
      margin: '0px',
      padding: '0',
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'transparent',
        color: 'rgba(45, 112, 169, 1)',
      },
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
        noOptionsMessage={() => 'Нічого не знайдено'}
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

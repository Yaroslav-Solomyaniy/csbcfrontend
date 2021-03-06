import React from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import clsx from 'clsx';
import { Option, SelectType } from '../../../types';
import styles from './index.module.scss';

interface Select {
  options: Option[];
  type: SelectType;
  value: string | number | boolean | null | undefined;
  onChange: (value: string) => void;
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
    control: (provided: any) => ({
      ...provided,
      background: '#fff',
      borderColor: 'rgba(0,0,0,0.1)',
      minHeight: '32px',
      height: '32px',
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
      height: '32px',
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
      height: '32px',
    }),
  },
};

const Select = ({
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
}: Select): JSX.Element => (

  <div className={styles.wrap}>
    {label && (
    <label className={clsx(styles.label, error && styles.error_label)}>
      {label}
      {required && <span className={styles.required}>*</span>}
    </label>
    )}
    <div className={styles.selectWrap}>
      <ReactSelect<Option>
        menuPosition="absolute"
        menuPlacement="auto"
        styles={Styles[type]}
        isSearchable={isSearchable}
        className={styles.select}
        options={options}
        placeholder={placeholder}
        isClearable={isClearable}
        noOptionsMessage={() => '???????????? ???? ????????????????'}
        value={options.find((option) => option?.value?.toString() === value?.toString()) || null}
        onChange={(option: SingleValue<Option>) => onChange(option?.value ? `${option.value}` : '')}
      />
      {error && (
      <div className={styles.error}>
        <div className={styles.textError}>{error}</div>
      </div>
      )}
    </div>
  </div>
);

Select.defaultProps = {
  label: '',
  error: '',
  required: false,
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  menuPosition: '',
};

export default Select;

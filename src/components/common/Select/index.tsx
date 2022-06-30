import React from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { Option } from '../../../types';

import styles from './index.module.scss';

interface Select {
  label?: string;
  options: Option[];
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
}

const Select = ({
  label, options, value, onChange, required, error, placeholder, isSearchable, isClearable,
}: Select): JSX.Element => (
  <div className={styles.wrap}>
    {label && (
    <label className={styles.label}>
      {label}
      {required && <span className={styles.required}>*</span>}
    </label>
    )}
    <div className={styles.selectWrap}>
      <ReactSelect<Option>
        isSearchable={isSearchable}
        className={styles.select}
        options={options}
        placeholder={placeholder}
        isClearable={isClearable}
        value={options.find((option) => option.value === value) || null}
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
};

export default Select;

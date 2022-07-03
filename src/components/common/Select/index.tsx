import React from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { Option } from '../../../types';

import styles from './index.module.scss';

interface Select {
  label?: string;
  options: Option[];
  value: string | number | null;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isFilter?: boolean;
}

const customStyles = {
  control: (style: any) => ({
    ...style,
    borderRadius: 8,
  }),
};

const customStylesFilter = {
  control: (style: any) => ({
    ...style,
    borderRadius: 8,
    height: 42,
  }),
};

const Select = ({
  label, options, value, onChange, required, error, placeholder, isSearchable, isClearable, isFilter,
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
        styles={isFilter ? customStylesFilter : customStyles}
        // components={{ IndicatorSeparator: () => null }}
        options={options}
        placeholder={placeholder}
        isClearable={isClearable}
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
  isFilter: false,
};

export default Select;

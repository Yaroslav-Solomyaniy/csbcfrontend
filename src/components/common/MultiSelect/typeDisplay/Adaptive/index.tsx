import React from 'react';
import clsx from 'clsx';
import ReactSelect from 'react-select';
import { Option, SelectType } from '../../../../../types';
import styles from './index.module.scss';
import { useDeviceContext } from '../../../../../context/TypeDevice';
import { AdaptiveMultiSelectStyle } from '../SelectStyle';

interface IAdaptiveMultiSelect{
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

const AdaptiveMultiSelect = ({ label,
  options,
  value,
  onChange,
  required,
  error,
  placeholder,
  isSearchable,
  isClearable,
  type }:IAdaptiveMultiSelect) => {
  const { isTablet, isPhone } = useDeviceContext();

  return (
    <div className={clsx(isTablet ? styles.TabletRow : isPhone && styles.PhoneRow)}>
      {label && (
        <label
          className={clsx(styles.label)}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div>
        <ReactSelect
          styles={AdaptiveMultiSelectStyle[type]}
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
};

AdaptiveMultiSelect.defaultProps = {
  label: '',
  error: '',
  required: false,
  placeholder: '',
  isSearchable: false,
  isClearable: false,
};

export default AdaptiveMultiSelect;

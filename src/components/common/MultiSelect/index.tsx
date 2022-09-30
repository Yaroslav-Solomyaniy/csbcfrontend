import React from 'react';
import clsx from 'clsx';
import ReactSelect from 'react-select';
import { Option, SelectType } from '../../../types';
import { DeviceContext } from '../../../context/All/DeviceType';
import styles from './index.module.scss';
import { MultiSelectDesktopStyle, MultiSelectMobileStyle } from './SelectStyle';

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
}: MultiSelect): JSX.Element => {
  const { isDesktop, isTablet, isPhone } = DeviceContext();

  return (
    <div className={clsx(isDesktop && styles.wrap, isTablet && styles.tablet_row, isPhone && styles.phone_row)}>
      {label && (
        <label className={clsx(isDesktop ? styles.desktop_label
          : styles.mobile_label, isDesktop && (error && styles.error_label))}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={clsx(isDesktop && styles.selectWrap)}>
        <ReactSelect
          styles={isDesktop ? MultiSelectDesktopStyle[type] : MultiSelectMobileStyle[type]}
          isSearchable={isSearchable}
          className={clsx(isDesktop ? styles.desktop_select : styles.mobile_select)}
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

MultiSelect.defaultProps = {
  label: '',
  error: '',
  required: false,
  placeholder: '',
  isSearchable: false,
  isClearable: false,
};

export default MultiSelect;

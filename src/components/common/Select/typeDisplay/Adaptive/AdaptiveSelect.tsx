import React, { useRef } from 'react';
import clsx from 'clsx';
import ReactSelect, { SingleValue } from 'react-select';
import { Option, SelectType } from '../../../../../types';
import styles from './AdaptiveSelect.module.scss';
import { SelectStylesPhone, SelectStylesTablet } from '../SelectStyle';
import { useDeviceContext } from '../../../../../context/TypeDevice';

interface IAdaptiveSelect{
  options: Option[];
  value: string | number | boolean | null | undefined;
  onChange: (value: string) => void;
  label: string;
  required: boolean;
  error: string;
  type: SelectType;
  placeholder: string;
  isSearchable: boolean;
  isClearable: boolean;
  isDisabled: boolean;
  menuPos: 'fixed' | 'absolute';
  menuPlace: 'top' | 'auto' | 'bottom';
  isFilter: boolean;
}

const AdaptiveSelect = ({ label,
  options,
  value,
  onChange,
  required,
  error,
  placeholder,
  isSearchable,
  isClearable,
  type,
  isDisabled,
  menuPos,
  menuPlace,
  isFilter }:IAdaptiveSelect) => {
  const focusIndexRef = useRef(-1);
  const { isTablet, isPhone } = useDeviceContext();

  return (
    <div className={clsx(isFilter
      ? (isTablet ? styles.TabletFilterSelect : isPhone && styles.PhoneFilterSelect)
      : isTablet ? styles.TabletRow : isPhone && styles.PhoneRow)}
    >
      {label && (
        <label
          className={clsx(styles.label)}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={clsx(isFilter ? '' : styles.Select)}>
        <ReactSelect<Option>
          isDisabled={isDisabled}
          menuPosition={menuPos}
          menuPlacement={menuPlace}
          styles={isTablet ? SelectStylesTablet[type] : (isPhone && SelectStylesPhone[type])}
          isSearchable={isSearchable}
          className={styles.select}
          options={options}
          placeholder={placeholder}
          isClearable={isClearable}
          noOptionsMessage={() => 'Нічого не знайдено'}
          value={options.find((option) => option?.value?.toString() === value?.toString()) || null}
          onChange={(option: SingleValue<Option>) => onChange(option?.value ? `${option.value}` : '')}
          ariaLiveMessages={{
            onFocus: (e) => {
              focusIndexRef.current = e.options.indexOf(e.focused);

              return '';
            },
          }}
          onKeyDown={(e) => {
            if (
              e.key === 'ArrowDown'
              && focusIndexRef.current === options.length - 1
            ) {
              e.preventDefault();
            }
            if (e.key === 'ArrowUp' && focusIndexRef.current === 0) {
              e.preventDefault();
            }
          }}
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

export default AdaptiveSelect;

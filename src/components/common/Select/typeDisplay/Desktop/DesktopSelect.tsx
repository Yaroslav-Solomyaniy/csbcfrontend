import React, { useRef } from 'react';
import clsx from 'clsx';
import ReactSelect, { SingleValue } from 'react-select';
import { Option, SelectType } from '../../../../../types';
import styles from './DesktopSelect.module.scss';
import { SelectStylesDesktop } from '../SelectStyle';

interface IDesktopSelect{
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

const DesktopSelect = ({ label,
  options,
  value,
  onChange,
  required,
  error,
  type,
  placeholder,
  isSearchable,
  isClearable,
  isDisabled,
  menuPos,
  menuPlace,
  isFilter }:IDesktopSelect) => {
  const focusIndexRef = useRef(-1);

  return (
    <div className={clsx(isFilter ? styles.filterSelect : styles.wrap)}>
      {label && (
        <label
          className={clsx(styles.label, error && styles.error_label)}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={clsx(isFilter ? '' : styles.selectWrap)}>
        <ReactSelect<Option>
          isDisabled={isDisabled}
          menuPosition={menuPos}
          menuPlacement={menuPlace}
          styles={SelectStylesDesktop[type]}
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

export default DesktopSelect;

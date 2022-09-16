import React, { useRef } from 'react';
import clsx from 'clsx';
import ReactSelect, { SingleValue } from 'react-select';
import { Option, SelectType } from '../../../../../types';
import styles from './AdaptiveSelect.module.scss';
import { SelectStylesTablet } from '../SelectStyle';

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

// const Style: any = {
//   pagination: {
//     control: (provided: any) => ({
//       ...provided,
//       background: '#fff',
//       border: '1px solid rgba(0, 0, 0, 0.1)',
//       maxWidth: 75,
//       minHeight: '100%',
//       height: '32px',
//       borderRadius: '8px',
//       fontWeight: 400,
//       color: 'rgba(0, 0, 0, 0.75)',
//       boxShadow: 'none',
//       '&:hover': {
//         border: '1px solid rgba(39, 111, 173, 1)',
//       },
//       '&:focus': {
//         border: '1px solid rgba(39, 111, 173, 1)',
//       },
//       '&:active': {
//         border: '1px solid rgba(39, 111, 173, 1)',
//       },
//     }),
//     indicatorSeparator: (provided: any) => ({
//       ...provided,
//       display: 'none',
//     }),
//     indicatorsContainer: (provided: any) => ({
//       ...provided,
//       height: '32px',
//     }),
//     option: (base: any, state: any) => ({
//       ...base,
//       background: state.isSelected ? '#428BCA' : '#FEFEFE',
//       '&:hover': {
//         cursor: 'pointer',
//         background: state.isSelected ? '#428BCA' : '#D7E7F4',
//       },
//     }),
//     menu: (base: any) => ({
//       ...base,
//       background: '#FEFEFE',
//       overflow: 'hidden',
//     }),
//     menuList: (base: any) => ({
//       ...base,
//       background: '#FEFEFE',
//     }),
//     clearIndicator: (provided: any) => ({
//       ...provided,
//       '&:hover': {
//         backgroundColor: 'transparent',
//         color: 'rgba(45, 112, 169, 1)',
//       },
//     }),
//     dropdownIndicator: (provided: any) => ({
//       ...provided,
//       '&:hover': {
//         backgroundColor: 'transparent',
//         color: 'rgba(45, 112, 169, 1)',
//       },
//     }),
//   },
//   filter: {
//     control: (provided: any) => ({
//       ...provided,
//       background: '#fff',
//       border: '1px solid rgba(0, 0, 0, 0.1)',
//       height: '42px',
//       width: '280px',
//       borderRadius: '8px',
//       boxShadow: 'none',
//       fontWeight: 400,
//       color: 'rgba(0, 0, 0, 0.75)',
//       '&:hover': {
//         border: '1px solid rgba(39, 111, 173, 1)',
//       },
//       '&:focus': {
//         border: '1px solid rgba(39, 111, 173, 1)',
//       },
//       '&:active': {
//         border: '1px solid rgba(39, 111, 173, 1)',
//       },
//     }),
//     indicatorSeparator: (provided: any) => ({
//       ...provided,
//       display: 'none',
//     }),
//     option: (base: any, state: any) => ({
//       ...base,
//       background: state.isSelected ? '#428BCA' : '#FEFEFE',
//       '&:hover': {
//         cursor: 'pointer',
//         background: state.isSelected ? '#428BCA' : '#D7E7F4',
//       },
//     }),
//     menu: (base: any) => ({
//       ...base,
//       background: '#FEFEFE',
//       overflow: 'hidden',
//       zIndex: 980,
//     }),
//     menuList: (base: any) => ({
//       ...base,
//       background: '#FEFEFE',
//       zIndex: 980,
//     }),
//     valueContainer: (provided: any) => ({
//       ...provided,
//       padding: '9px 16px',
//       fontSize: '14px',
//     }),
//     clearIndicator: (provided: any) => ({
//       ...provided,
//       '&:hover': {
//         backgroundColor: 'transparent',
//         color: 'rgba(45, 112, 169, 1)',
//       },
//     }),
//     dropdownIndicator: (provided: any) => ({
//       ...provided,
//       '&:hover': {
//         backgroundColor: 'transparent',
//         color: 'rgba(45, 112, 169, 1)',
//       },
//     }),
//   },
//   modal: {
//     control: (provided: any) => ({
//       ...provided,
//       background: '#fff',
//       border: '1px solid rgba(0, 0, 0, 0.1)',
//       borderRadius: '8px',
//       boxShadow: 'none',
//       height: 42,
//       fontWeight: 400,
//       color: 'rgba(0, 0, 0, 0.75)',
//       '&:hover': {
//         border: '1px solid rgba(39, 111, 173, 1)',
//       },
//       '&:focus': {
//         border: '1px solid rgba(39, 111, 173, 1)',
//       },
//       '&:active': {
//         border: '1px solid rgba(39, 111, 173, 1)',
//       },
//     }),
//     indicatorSeparator: (provided: any) => ({
//       ...provided,
//       display: 'none',
//     }),
//     option: (base: any, state: any) => ({
//       ...base,
//       background: state.isSelected ? '#428BCA' : '#FEFEFE',
//       '&:hover': {
//         cursor: 'pointer',
//         background: state.isSelected ? '#428BCA' : '#D7E7F4',
//       },
//     }),
//     menu: (base: any) => ({
//       ...base,
//       background: '#FEFEFE',
//       overflow: 'hidden',
//       zIndex: 980,
//     }),
//     menuList: (base: any) => ({
//       ...base,
//       background: '#FEFEFE',
//       zIndex: 980,
//     }),
//     valueContainer: (provided: any) => ({
//       ...provided,
//       padding: '8px 16px',
//       fontSize: '14px',
//       height: 42,
//     }),
//     input: (provided: any) => ({
//       ...provided,
//       margin: '0px',
//       padding: '0',
//     }),
//     indicatorsContainer: (provided: any) => ({
//       ...provided,
//       height: '42px',
//     }),
//     clearIndicator: (provided: any) => ({
//       ...provided,
//       '&:hover': {
//         backgroundColor: 'transparent',
//         color: 'rgba(45, 112, 169, 1)',
//       },
//     }),
//     dropdownIndicator: (provided: any) => ({
//       ...provided,
//       '&:hover': {
//         backgroundColor: 'transparent',
//         color: 'rgba(45, 112, 169, 1)',
//       },
//     }),
//   },
// };

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

  return (
    <div className={clsx(isFilter ? styles.filterSelect : styles.TabletRow)}>
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
          styles={SelectStylesTablet[type]}
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

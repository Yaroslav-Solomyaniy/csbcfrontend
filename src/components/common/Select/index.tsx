import React, { useRef } from 'react';
import clsx from 'clsx';
import ReactSelect, { SingleValue } from 'react-select';
import { Option, SelectType } from '../../../types';
import { DeviceContext } from '../../../context/All/DeviceType';
import styles from './index.module.scss';
import { SelectStylesDesktop, SelectStylesPhone, SelectStylesTablet } from './SelectStyle';

interface ISelect {
  options: Option[];
  value: string | number | boolean | null | undefined;
  onChange: (value: string) => void;
  type: SelectType;
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  menuPos?: 'fixed' | 'absolute';
  menuPlace?: 'top' | 'auto' | 'bottom';
  isFilter?: boolean;
  isSemesterInMultiSelect?: boolean;
}

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
  isDisabled,
  menuPos,
  menuPlace,
  isFilter,
}: ISelect): JSX.Element => {
  const { isDesktop, isTablet, isPhone } = DeviceContext();
  const focusIndexRef = useRef(-1);

  return (
    type === 'mini'
      ? (
        <ReactSelect<Option>
          isDisabled={isDisabled}
          menuPosition={menuPos}
          menuPlacement={menuPlace}
          styles={isDesktop ? SelectStylesDesktop[type] : isTablet ? SelectStylesTablet[type] : SelectStylesPhone[type]}
          isSearchable={isSearchable}
          className={clsx(isDesktop && styles.desktop_select)}
          options={options}
          placeholder={placeholder}
          isClearable={isClearable}
          noOptionsMessage={() => 'Нічого не знайдено'}
          value={options.find((option) => option?.value?.toString() === value?.toString()) || null}
          onChange={(option: SingleValue<Option>) => onChange(option?.value ? `${option.value}` : '')}
        />
      ) : (
        <div className={clsx(
          isDesktop && (isFilter ? styles.desktop_filter : styles.desktop_wrap),
          isTablet && (isFilter ? styles.tablet_filter : styles.tablet_wrap),
          isPhone && (isFilter ? styles.phone_filter : styles.phone_wrap),
        )}
        >
          {label && (
          <label
            className={clsx(
              isDesktop ? styles.desktop_label : styles.mobile_label,
              isDesktop && (error && styles.error_label),
            )}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>

          )}
          <div className={clsx(isDesktop ? (!isFilter && styles.selectWrap) : (!isFilter && styles.mobile_select))}>
            <ReactSelect<Option>
              isDisabled={isDisabled}
              menuPosition={menuPos}
              menuPlacement={menuPlace}
              // eslint-disable-next-line max-len
              styles={isDesktop ? SelectStylesDesktop[type] : isTablet ? SelectStylesTablet[type] : SelectStylesPhone[type]}
              isSearchable={isSearchable}
              className={clsx(isDesktop && styles.desktop_select)}
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
      )
  );
};

Select.defaultProps = {
  label: '',
  error: '',
  required: false,
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  menuPos: 'fixed',
  menuPlace: 'auto',
  isDisabled: false,
  isFilter: false,
  isSemesterInMultiSelect: false,
};

export default Select;

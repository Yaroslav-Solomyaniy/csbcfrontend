import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { DeviceContext } from '../../../context/All/DeviceType';
import styles from './index.module.scss';

interface IModalInput {
  inputType?: string;
  label?: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string | boolean;
  placeholder?: string;
  pattern?: RegExp;
  className?: string;
}

const ModalInput = ({
  className,
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
  pattern,
  inputType,
}: IModalInput): JSX.Element => {
  const { isDesktop, isTablet, isPhone } = DeviceContext();

  return (
    <div className={clsx(
      isDesktop && (label ? styles.desktop_wrap : styles.desktop_wrap_center),
      isTablet && (label ? styles.tablet_wrap : styles.tablet_wrap_center),
      isPhone && (label ? styles.phone_wrap : styles.phone_wrap_center),
    )}
    >
      {label && (
        <label className={clsx(
          isDesktop && styles.desktop_label,
          (isTablet || isPhone) && styles.mobile_label,
          isDesktop && error && styles.error_label,
        )}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div>
        <input
          type={inputType}
          className={clsx(isDesktop ? styles.desktop_input : styles.mobile_input, className)}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (pattern) {
              if (pattern.test(e.target.value) || !e.target.value) {
                onChange(e);
              }
            } else {
              onChange(e);
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

ModalInput.defaultProps = {
  inputType: 'text',
  label: '',
  required: false,
  placeholder: '',
  error: '',
  pattern: '',
  className: '',
};

export default ModalInput;

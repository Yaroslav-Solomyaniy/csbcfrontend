import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './InputMobile.module.scss';
import { useDeviceContext } from '../../../../../context/TypeDevice';

interface IInputMobile{
  inputType: string;
  label: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  error: string | boolean;
  placeholder: string;
  pattern?: RegExp;
  className: string;
}

const InputMobile = ({ label,
  value,
  onChange,
  required,
  error,
  placeholder,
  pattern,
  className,
  inputType }:IInputMobile):JSX.Element => {
  const { isTablet } = useDeviceContext();

  return (
    <div className={clsx(isTablet ? styles.Row : styles.Row_phone)}>
      {label && (
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      )}
      <div className={styles.InputRow}>
        <input
          type={inputType}
          className={clsx(styles.input, className)}
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

InputMobile.defaultProps = {
  pattern: '',
};

export default InputMobile;

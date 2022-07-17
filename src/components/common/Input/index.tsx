import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface IInput {
  label?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string | boolean;
  placeholder?: string;
  pattern?: RegExp;
}

const Input = ({ label, value, onChange, required, error, placeholder, pattern }: IInput): JSX.Element => (
  <div className={styles.wrap}>
    {label && (
      <label className={clsx(styles.label, error && styles.error_label)}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    )}
    <div className={styles.InputWrap}>
      <input
        className={styles.input}
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

Input.defaultProps = {
  label: '',
  required: false,
  placeholder: '',
  error: '',
  pattern: '',
  onBlur: () => undefined,
};

export default Input;

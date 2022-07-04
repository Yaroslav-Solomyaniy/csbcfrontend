import React, { ChangeEvent } from 'react';
import styles from './index.module.scss';

interface IInput {
  label?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string | boolean;
  placeholder?: string;
}

const Input = ({ label, value, onChange, required, error, placeholder }: IInput): JSX.Element => (
  <div className={styles.wrap}>
    {label && (
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    )}
    <div className={styles.InputWrap}>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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

};

export default Input;

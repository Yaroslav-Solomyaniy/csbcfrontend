import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './InputNoteBook.module.scss';

interface IInputNotebook{
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

const InputNotebook = ({ label,
  value,
  onChange,
  required,
  error,
  placeholder,
  pattern,
  className,
  inputType }:IInputNotebook):JSX.Element => (
    <div className={styles.Row}>
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

InputNotebook.defaultProps = {
  pattern: '',
};

export default InputNotebook;

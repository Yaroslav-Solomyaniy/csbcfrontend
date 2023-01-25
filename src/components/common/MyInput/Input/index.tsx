import React, { ChangeEvent } from 'react';
import styles from './index.module.scss';

interface IInput {
  inputType?: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  pattern?: RegExp;
  className?: string;
  error?: string | boolean;
}

const Input = ({ className, value, onChange, placeholder, pattern, inputType, error }: IInput): JSX.Element => (
  <>
    <input
      type={inputType}
      className={className}
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
  </>
);

Input.defaultProps = {
  inputType: 'text',
  label: '',
  required: false,
  placeholder: '',
  error: '',
  pattern: '',
  className: '',
};

export default Input;

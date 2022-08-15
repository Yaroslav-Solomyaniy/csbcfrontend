import React from 'react';
import clsx from 'clsx';
import styles from '../../Select/index.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import '../datePicker.css';
import MyDatePicker from '../index';

interface SelectDate {
  value: Date | string | null;
  onChange: (date: Date| string | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  dateFormat?: string;
}

const SelectDate = ({ value, onChange, label, error, required, placeholder, dateFormat }: SelectDate) => (
  <div className={styles.wrap}>
    {label && (
      <label className={clsx(styles.label, error && styles.error_label)}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    )}
    <div className={styles.selectWrap}>
      <MyDatePicker
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        dateFormat={dateFormat}
        showMonthDropdown
        showDisabledMonthNavigation
        maxDate={new Date()}
        minDate={new Date(1980, 1, 1)}
      />
      {error && (
        <div className={styles.error}>
          <div className={styles.textError}>{error}</div>
        </div>
      )}
    </div>
  </div>
);

SelectDate.defaultProps = {
  placeholder: '',
  required: false,
  isFilter: false,
  label: '',
  error: '',
  dateFormat: '',
};

export default SelectDate;

import React from 'react';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import uk from 'date-fns/locale/uk';
import styles from '../../Select/index.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './dateAndTimePicker.css';
import MyDatePicker from '../index';

interface SelectDateAndTime {
  value: Date | string | null;
  onChange: (date: Date| string | null) => void;
  placeholder?: string;
  label?: string;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
}

const SelectDateAndTime = ({ value, onChange, label, error, required, placeholder }: SelectDateAndTime) => (
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
        showMonthDropdown
        showDisabledMonthNavigation
        timeInputLabel="Час:"
        dateFormat="Pp"
        timeFormat="p"
        showTimeInput
      />
      {error && (
        <div className={styles.error}>
          <div className={styles.textError}>{error}</div>
        </div>
      )}
    </div>
  </div>
);

SelectDateAndTime.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default SelectDateAndTime;

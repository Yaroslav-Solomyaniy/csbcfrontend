import React from 'react';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import uk from 'date-fns/locale/uk';
import styles from '../index.module.scss';

import './style.css';

interface SelectDate {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
}

const SelectDate = ({ value, onChange, label, error, required }: SelectDate) => (
  <div className={styles.wrap}>
    {label && (
      <label className={clsx(styles.label, error && styles.error_label)}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    )}
    <div className={styles.selectWrap}>
      <DatePicker
        locale={uk}
        selected={value}
        onChange={onChange}
        timeInputLabel="Час:"
        dateFormat="Pp:mm"
        timeFormat="p"
        showTimeInput
        showMonthDropdown
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
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default SelectDate;

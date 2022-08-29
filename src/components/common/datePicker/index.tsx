import React from 'react';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import uk from 'date-fns/locale/uk';
import styles from '../Select/index.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.css';

interface IMyDatePicker {
  onChange: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  showMonthDropdown?:boolean;
  dateFormat?:string;
  minDate?: Date | null | undefined;
  maxDate?: Date | null | undefined;
  showDisabledMonthNavigation?:boolean;
  showTimeInput?:boolean;
  timeFormat?:string;
  timeInputLabel?:string;
  showTimeSelect?:boolean;
  selected?: Date;
}

const MyDatePicker = ({
  onChange,
  label,
  error,
  required,
  selected,
  placeholder,
  showMonthDropdown,
  timeFormat,
  dateFormat,
  showTimeSelect,
  minDate,
  maxDate,
  showDisabledMonthNavigation,
  showTimeInput,
  timeInputLabel,
}: IMyDatePicker):JSX.Element => (
  <div className={styles.wrap}>
    {label && (
      <label className={clsx(styles.label, error && styles.error_label)}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    )}
    <div className={styles.selectWrap}>
      <DatePicker
        placeholderText={placeholder}
        locale={uk}
        selected={selected}
        onChange={onChange}
        showMonthDropdown={showMonthDropdown}
        dateFormat={dateFormat}
        showTimeSelect={showTimeSelect}
        minDate={minDate}
        timeIntervals={15}
        maxDate={maxDate}
        showDisabledMonthNavigation={showDisabledMonthNavigation}
        showTimeInput={showTimeInput}
        timeFormat={timeFormat}
        timeInputLabel={timeInputLabel}
      />
      {error && (
        <div className={styles.error}>
          <div className={styles.textError}>{error}</div>
        </div>
      )}
    </div>
  </div>
);

MyDatePicker.defaultProps = {
  placeholder: '',
  isSearchable: false,
  required: false,
  label: '',
  error: '',
  showMonthDropdown: false,
  dateFormat: 'dd.MM.yyyy',
  minDate: null,
  maxDate: null,
  showDisabledMonthNavigation: false,
  showTimeInput: false,
  timeFormat: '',
  timeInputLabel: '',
  selected: null,
  showTimeSelect: false,
};

export default MyDatePicker;
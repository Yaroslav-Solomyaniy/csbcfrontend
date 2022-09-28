import React from 'react';
import { useDeviceContext } from '../../../context/TypeDevice';
import DesktopDatePicker from './typeDisplay/Desktop';
import TabletDatePicker from './typeDisplay/Tablet';
import PhoneDatePicker from './typeDisplay/Phone';

interface IMyDatePicker {
  onChange: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  showMonthDropdown?: boolean;
  dateFormat?: string;
  minDate?: Date | null | undefined;
  maxDate?: Date | null | undefined;
  showDisabledMonthNavigation?: boolean;
  showTimeInput?: boolean;
  timeFormat?: string;
  timeInputLabel?: string;
  showTimeSelect?: boolean;
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
}: IMyDatePicker): JSX.Element => {
  const { isPhone, isDesktop, isTablet } = useDeviceContext();

  return (
    <>
      {isDesktop && (
        <DesktopDatePicker
          placeholder={placeholder}
          label={label}
          error={error}
          required={required}
          selected={selected}
          onChange={onChange}
          showMonthDropdown={showMonthDropdown}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          minDate={minDate}
          maxDate={maxDate}
          showDisabledMonthNavigation={showDisabledMonthNavigation}
          showTimeInput={showTimeInput}
          timeFormat={timeFormat}
          timeInputLabel={timeInputLabel}
        />
      )}
      {isTablet && (
        <TabletDatePicker
          placeholder={placeholder}
          label={label}
          error={error}
          required={required}
          selected={selected}
          onChange={onChange}
          showMonthDropdown={showMonthDropdown}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          minDate={minDate}
          maxDate={maxDate}
          showDisabledMonthNavigation={showDisabledMonthNavigation}
          showTimeInput={showTimeInput}
          timeFormat={timeFormat}
          timeInputLabel={timeInputLabel}
        />
      )}
      {isPhone && (
        <PhoneDatePicker
          placeholder={placeholder}
          label={label}
          error={error}
          required={required}
          selected={selected}
          onChange={onChange}
          showMonthDropdown={showMonthDropdown}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          minDate={minDate}
          maxDate={maxDate}
          showDisabledMonthNavigation={showDisabledMonthNavigation}
          showTimeInput={showTimeInput}
          timeFormat={timeFormat}
          timeInputLabel={timeInputLabel}
        />
      )}
    </>

  );
};

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

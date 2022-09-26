import React from 'react';
import { Option, SelectType } from '../../../types';
import { useDeviceContext } from '../../../context/TypeDevice';
import DesktopMultiSelect from './typeDisplay/Desktop';
import AdaptiveMultiSelect from './typeDisplay/Adaptive';

interface MultiSelect {
  options: Option[];
  type: SelectType;
  value: string[];
  onChange: (value: Option[]) => void;
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
}

const MultiSelect = ({
  label,
  options,
  value,
  onChange,
  required,
  error,
  placeholder,
  isSearchable,
  isClearable,
  type,
}: MultiSelect): JSX.Element => {
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  return (
    <>
      {isDesktop && (
        <DesktopMultiSelect
          label={label}
          required={required}
          error={error}
          type={type}
          isSearchable={isSearchable}
          options={options}
          placeholder={placeholder}
          isClearable={isClearable}
          value={value}
          onChange={onChange}
        />
      )}
      {(isTablet || isPhone) && (
        <AdaptiveMultiSelect
          label={label}
          required={required}
          error={error}
          type={type}
          isSearchable={isSearchable}
          options={options}
          placeholder={placeholder}
          isClearable={isClearable}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
};

MultiSelect.defaultProps = {
  label: '',
  error: '',
  required: false,
  placeholder: '',
  isSearchable: false,
  isClearable: false,
};

export default MultiSelect;

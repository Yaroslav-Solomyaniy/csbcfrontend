import { useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';

interface ISelectReason {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
  type: SelectType;
}

const SelectReason = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  error,
}: ISelectReason): JSX.Element => {
  const [options, setOptions] = useState<Option[]>([
    {
      value: 1,
      label: 'Екзамен',
    },
    {
      value: 2,
      label: 'Перездача',
    },
    {
      value: 3,
      label: 'Помилкове введення оцінки',
    }]);

  return (
    <Select
      type={type}
      label={label}
      onChange={onChange}
      value={value}
      options={options}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      required={required}
      error={error}
    />
  );
};

SelectReason.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default SelectReason;

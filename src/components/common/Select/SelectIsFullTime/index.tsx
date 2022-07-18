import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';
import { useStudentsContext } from '../../../../context/students';

interface SelectCurator {
  label?: string;
  value: boolean | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
  type: SelectType;
}

const SelectPIB = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  error,
  isClearable,
  isSearchable,
}: SelectCurator): JSX.Element => {
  const options = [
    { value: 'Денна', label: 'Денна' },
    { value: 'Заочна', label: 'Заочна' },
  ];
  const { getStudents } = useStudentsContext();

  return (
    <Select
      type={type}
      label={label}
      onChange={onChange}
      value={value ? 'Денна' : value === undefined ? '' : 'Заочна'}
      options={options}
      placeholder={placeholder}
      isSearchable
      isClearable
      required
      error={error}
    />
  );
};

SelectPIB.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default SelectPIB;

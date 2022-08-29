import { useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';

interface ISelectSemester {
  value: string | number;
  onChange: (value: string) => void;
  type: SelectType;
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  menuPos?: 'fixed' | 'absolute';
  menuPlace?: 'top' | 'auto' | 'bottom';
  isFilter?: boolean;
  isSemesterInMultiSelect?: boolean;
}

const SelectSemester = ({
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
  isSearchable,
  isClearable,
  type,
  isSemesterInMultiSelect,
  isDisabled,
  menuPos,
  menuPlace,
  isFilter,
}: ISelectSemester): JSX.Element => {
  const [options, setOptions] = useState<Option[]>([
    {
      value: 1,
      label: 'І семестр',
    },
    {
      value: 2,
      label: 'ІI семестр',
    }]);

  return (
    <Select
      label={label}
      type={type}
      onChange={onChange}
      value={value}
      options={options}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      required={required}
      error={error}
      isDisabled={isDisabled}
      isFilter={isFilter}
      menuPlace={menuPlace}
      isSemesterInMultiSelect={isSemesterInMultiSelect}
      menuPos={menuPos}
    />
  );
};

SelectSemester.defaultProps = {
  label: '',
  error: '',
  required: false,
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  menuPos: 'absolute',
  menuPlace: 'auto',
  isDisabled: false,
  isFilter: false,
  isSemesterInMultiSelect: false,
};

export default SelectSemester;

import { useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';

interface ISelectCompulsory {
  value: string | boolean | null;
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
}

const SelectCompulsory = ({
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
  isSearchable,
  isClearable,
  type,
  isDisabled,
  menuPos,
  menuPlace,
  isFilter,
}: ISelectCompulsory): JSX.Element => {
  const [options] = useState<Option[]>([
    {
      value: 'Загальна компетентність',
      label: 'Загальна компетентність',
    },
    {
      value: 'Фахова компетентність',
      label: 'Фахова компетентність',
    },
    {
      value: 'Вибіркова загальна компетентність',
      label: 'Вибіркова загальна компетентність',
    },
    {
      value: 'Вибіркова фахова компетентність',
      label: 'Вибіркова фахова компетентність',
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
      menuPos={menuPos}
    />
  );
};

SelectCompulsory.defaultProps = {
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
};

export default SelectCompulsory;

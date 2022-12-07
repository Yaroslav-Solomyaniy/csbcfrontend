import { useState } from 'react';
import Select from '../index';
import { Option, SelectTypes } from '../../../../types';

interface ISelectStatusVoting {
  value: string | boolean;
  onChange: (value: string) => void;
  type: SelectTypes;
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

const SelectStatusVoting = ({
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
}: ISelectStatusVoting): JSX.Element => {
  const [options] = useState<Option[]>([
    {
      value: 'Нове',
      label: 'Нове',
    },
    {
      value: 'У прогресі',
      label: 'У прогресі',
    },
    {
      value: 'Потребує перегляду',
      label: 'Потребує перегляду',
    },
    {
      value: 'Заплановане переголосування',
      label: 'Заплановане переголосування',
    },
    {
      value: 'Переголосування у прогресі',
      label: 'Переголосування у прогресі',
    },
    {
      value: 'Затвердженно',
      label: 'Затвердженно',
    },
  ]);

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

SelectStatusVoting.defaultProps = {
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

export default SelectStatusVoting;

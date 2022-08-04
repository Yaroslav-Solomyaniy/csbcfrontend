import Select from '../index';
import { SelectType } from '../../../../types';

interface SelectCurator {
  label?: string;
  value: boolean | null;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
  type: SelectType;
}

const SelectIsFullTime = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  error,
}: SelectCurator): JSX.Element => {
  const options = [
    { value: 'Денна', label: 'Денна' },
    { value: 'Заочна', label: 'Заочна' },
  ];

  return (
    <Select
      type={type}
      label={label}
      onChange={onChange}
      value={value ? 'Денна' : value === null ? '' : 'Заочна'}
      options={options}
      placeholder={placeholder}
      isSearchable
      isClearable
      required
      error={error}
    />
  );
};

SelectIsFullTime.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default SelectIsFullTime;

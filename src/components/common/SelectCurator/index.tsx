import { useEffect, useState } from 'react';
import Select from '../Select';
import { Option, SelectType } from '../../../types';
import { useGetOptionsCurator } from '../../../hooks/useGroups';
import { useGroupContext } from '../../../context/group';

interface SelectCurator {
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

const SelectCurator = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  error,
}: SelectCurator): JSX.Element => {
  const { optionCurators, getOptionsCurator } = useGetOptionsCurator();
  const [options, setOptions] = useState<Option[]>([]);
  const { groupCreate, groupEdit, groupDelete } = useGroupContext();

  useEffect(() => {
    getOptionsCurator();
  }, [groupEdit?.data, groupCreate?.data, groupDelete?.data]);

  useEffect(() => {
    if (optionCurators?.items.length) {
      setOptions(optionCurators.items.map((curator) => ({
        value: curator.id,
        label: `${curator.firstName} ${curator.lastName} ${curator.patronymic}`,
      })));
    }
  }, [optionCurators]);

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

SelectCurator.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default SelectCurator;

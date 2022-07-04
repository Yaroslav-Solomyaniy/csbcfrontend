import { useEffect, useState } from 'react';
import Select, { SelectType } from '../Select';
import { Option } from '../../../types';
import { useGetOptionsGroups } from '../../../hooks/useGroups';
import { useGroupContext } from '../../../context/group';

interface SelectGroup {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  required?: boolean;
  type: SelectType;
}

const SelectGroup = ({
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  type,
}: SelectGroup): JSX.Element => {
  const { optionsGroups, getOptionsGroups } = useGetOptionsGroups();
  const [options, setOptions] = useState<Option[]>([]);
  const { groupCreate, groupEdit, groupDelete } = useGroupContext();

  useEffect(() => {
    getOptionsGroups();
  }, [groupEdit?.data, groupCreate?.data, groupDelete?.data]);

  useEffect(() => {
    if (optionsGroups?.items.length) {
      setOptions(optionsGroups.items.map((group) => ({ value: group.name, label: group.name })));
    }
  }, [optionsGroups]);

  return (
    <Select
      onChange={onChange}
      value={value}
      options={options}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      required={required}
      type={type}
    />
  );
};

SelectGroup.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
};

export default SelectGroup;

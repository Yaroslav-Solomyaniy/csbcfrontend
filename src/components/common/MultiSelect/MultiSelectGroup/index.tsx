import { useEffect, useState } from 'react';
import { Option, SelectType } from '../../../../types';
import { useGroupContext } from '../../../../context/group';
import { useGetListGroups } from '../../../../hooks/useDropDown';
import MultiSelect from '../index';

interface IMultiSelectGroup {
  label?: string;
  value: string[];
  onChange: (value: Option[]) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
  type: SelectType;
}

const MultiSelectGroup = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  error,
}: IMultiSelectGroup): JSX.Element => {
  const { optionsGroups, getListGroups } = useGetListGroups();
  const [options, setOptions] = useState<Option[]>([]);
  const { groupCreate, groupEdit, groupDelete } = useGroupContext();

  useEffect(() => {
    getListGroups();
  }, [groupEdit?.data, groupCreate?.data, groupDelete?.data]);

  useEffect(() => {
    if (optionsGroups?.items.length) {
      setOptions(optionsGroups.items.map((group) => ({ value: `${group.id}`, label: group.name })));
    }
  }, [optionsGroups]);

  return (
    <MultiSelect
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
    />
  );
};

MultiSelectGroup.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default MultiSelectGroup;

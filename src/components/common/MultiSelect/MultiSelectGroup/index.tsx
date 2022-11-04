import { useEffect, useState } from 'react';
import { Option, SelectType } from '../../../../types';
import { GroupsContext } from '../../../../context/PagesInAdmin/Groups';
import { useGetListGroups } from '../../../../hooks/All/useDropDowns';
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
  disabled?: boolean;
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
  disabled,
}: IMultiSelectGroup): JSX.Element => {
  const { optionsGroups, getListGroups } = useGetListGroups();
  const [options, setOptions] = useState<Option[]>([]);
  const { groupCreate, groupEdit, groupDelete } = GroupsContext();

  useEffect(() => {
    getListGroups();
  }, [groupEdit?.data, groupCreate?.data, groupDelete?.data]);

  useEffect(() => {
    if (optionsGroups?.length) {
      setOptions(optionsGroups.map((group) => ({ value: `${group.id}`, label: group.name })));
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
      disabled={disabled}
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
  disabled: false,
};

export default MultiSelectGroup;

import { useEffect, useState } from 'react';
import { Option, SelectTypes } from '../../../../types';
import { GroupsContext } from '../../../../context/Pages/admin/Groups';
import { useGetListGroups } from '../../../../hooks/api/all/useDropDowns';
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
  type: SelectTypes;
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
  const { createGroup, editGroup, deleteGroup } = GroupsContext();

  useEffect(() => {
    getListGroups();
  }, [createGroup?.data, editGroup?.data, deleteGroup?.data]);

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

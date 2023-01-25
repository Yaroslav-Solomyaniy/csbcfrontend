import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectTypes } from '../../../../types';
import { GroupsContext } from '../../../../context/Pages/admin/Groups';
import { useGetListGroups } from '../../../../hooks/api/all/useDropDowns';
import { AuthContext } from '../../../../context/All/AuthContext';

interface ISelectGroupById {
  value: string | number | undefined | null;
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
  isTeacher?: boolean;
  isCurator?: boolean;
}

const SelectGroupById = ({
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
  isTeacher,
  isCurator,
}: ISelectGroupById): JSX.Element => {
  const { optionsGroups, getListGroups } = useGetListGroups();
  const [options, setOptions] = useState<Option[]>([]);
  const { createGroup, editGroup, deleteGroup } = GroupsContext();
  const { user } = AuthContext();

  useEffect(() => {
    getListGroups((isTeacher && { teacherId: user?.id } || isCurator && { curatorId: user?.id }) || {});
  }, [editGroup?.data, createGroup?.data, deleteGroup?.data]);

  useEffect(() => {
    if (optionsGroups?.length) {
      setOptions(optionsGroups.map((group) => ({ value: group.id, label: group.name })));
    }
  }, [optionsGroups]);

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

SelectGroupById.defaultProps = {
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
  isTeacher: false,
  isCurator: false,
};

export default SelectGroupById;

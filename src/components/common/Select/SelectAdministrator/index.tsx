import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectTypes } from '../../../../types';
import { useGetListAdministrators } from '../../../../hooks/api/all/useDropDowns';
import { AdministratorsContext } from '../../../../context/Pages/admin/Administators';

interface ISelectAdministrator {
  value: string | number | undefined;
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

const SelectAdministrator = ({
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

}: ISelectAdministrator): JSX.Element => {
  const { listAdmins, getListAdministrators } = useGetListAdministrators();
  const [options, setOptions] = useState<Option[]>([]);
  const { createAdmin, deleteAdmin, editAdmin } = AdministratorsContext();

  useEffect(() => {
    getListAdministrators();
  }, [deleteAdmin?.data, editAdmin?.data, createAdmin?.data]);

  useEffect(() => {
    if (listAdmins?.length) {
      setOptions(listAdmins.map((admin) => ({
        value: admin.id,
        label: `${admin.lastName} ${admin.firstName} ${admin.patronymic}`,
      })));
    }
  }, [listAdmins]);

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

SelectAdministrator.defaultProps = {
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

export default SelectAdministrator;

import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';
import { useGetListAdministrators } from '../../../../hooks/All/useDropDowns';
import { AdministratorsContext } from '../../../../context/PagesInAdmin/Administators';

interface ISelectAdministrator {
  value: string | number | undefined;
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
  const { administratorsCreate, administratorsDelete, administratorsEdit } = AdministratorsContext();

  useEffect(() => {
    getListAdministrators();
  }, [administratorsDelete?.data, administratorsEdit?.data, administratorsCreate?.data]);

  useEffect(() => {
    if (listAdmins?.items.length) {
      setOptions(listAdmins.items.map((admin) => ({
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

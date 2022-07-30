import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';
import { useGetListAdministrators } from '../../../../hooks/useDropDown';
import { useAdministratorsContext } from '../../../../context/administators';

interface ISelectAdministrator {
  label?: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
  type: SelectType;
}

const SelectAdministrator = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  error,
}: ISelectAdministrator): JSX.Element => {
  const { listAdmins, getListAdministrators } = useGetListAdministrators();
  const [options, setOptions] = useState<Option[]>([]);
  const { administratorsCreate, administratorsDelete, administratorsEdit } = useAdministratorsContext();

  useEffect(() => {
    getListAdministrators();
    console.log(listAdmins);
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
    />
  );
};

SelectAdministrator.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default SelectAdministrator;

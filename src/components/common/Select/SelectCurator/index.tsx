import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';
import { useGetListCurators } from '../../../../hooks/useDropDown';
import { useCuratorContext } from '../../../../context/curators';

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
  const [options, setOptions] = useState<Option[]>([]);
  const { optionCurators, getListCurators } = useGetListCurators();
  const { curatorDelete, curatorEdit, curatorCreate } = useCuratorContext();

  useEffect(() => {
    getListCurators();
  }, [curatorEdit, curatorDelete, curatorCreate]);

  useEffect(() => {
    if (optionCurators?.items.length) {
      setOptions(optionCurators.items.map((curator) => ({
        value: curator.id,
        label: `${curator.lastName} ${curator.firstName} ${curator.patronymic}`,
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

import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectTypes } from '../../../../types';
import { useGetListCurators } from '../../../../hooks/api/all/useDropDowns';
import { CuratorContext } from '../../../../context/Pages/admin/Curators';

interface SelectCurator {
  value: string | number | null;
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

const SelectCurator = ({
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
}: SelectCurator): JSX.Element => {
  const [options, setOptions] = useState<Option[]>([]);
  const { optionCurators, getListCurators } = useGetListCurators();
  const { deleteCurator, editCurator, createCurator } = CuratorContext();

  useEffect(() => {
    getListCurators();
  }, [editCurator, deleteCurator, createCurator]);

  useEffect(() => {
    if (optionCurators?.length) {
      setOptions(optionCurators.map((curator) => ({
        value: curator.id,
        label: `${curator.lastName || null} ${curator.firstName || null} ${curator.patronymic || null}`,
      })));
    }
  }, [optionCurators]);

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

SelectCurator.defaultProps = {
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

export default SelectCurator;

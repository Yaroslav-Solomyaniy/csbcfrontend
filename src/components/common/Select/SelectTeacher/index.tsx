import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';
import { useGetListTeachers } from '../../../../hooks/All/useDropDowns';

interface SelectTeacher {
  value: string | number | null;
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

const SelectTeacher = ({
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
}: SelectTeacher): JSX.Element => {
  const [options, setOptions] = useState<Option[]>([]);
  const { listTeachers, getListTeachers } = useGetListTeachers();

  useEffect(() => {
    getListTeachers();
  }, []);

  useEffect(() => {
    if (listTeachers?.items.length) {
      setOptions(listTeachers.items.map((teacher) => ({
        value: teacher.id,
        label: `${teacher.lastName} ${teacher.firstName} ${teacher.patronymic}`,
      })));
    }
  }, [listTeachers]);

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

SelectTeacher.defaultProps = {
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

export default SelectTeacher;

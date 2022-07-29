import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';
import { useGetListTeachers } from '../../../../hooks/useDropDown';

interface SelectTeacher {
  label?: string;
  value: string | number | null;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
  type: SelectType;
}

const SelectTeacher = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  error,
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
    />
  );
};

SelectTeacher.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default SelectTeacher;

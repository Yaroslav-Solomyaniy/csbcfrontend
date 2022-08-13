import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';
import { useStudentsContext } from '../../../../context/students';
import { useGetListStudents } from '../../../../hooks/useDropDown';

interface SelectPIB {
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

const SelectStudent = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  error,
}: SelectPIB): JSX.Element => {
  const { getListStudents, listStudents } = useGetListStudents();
  const [options, setOptions] = useState<Option[]>([]);
  const { studentCreate, studentEdit, studentDelete } = useStudentsContext();

  useEffect(() => {
    getListStudents({});
  }, [studentCreate?.data, studentEdit?.data, studentDelete?.data]);

  useEffect(() => {
    if (listStudents?.items.length) {
      setOptions(listStudents?.items.map((name) => ({
        value: name.id,
        label: `${name.user.lastName} ${name.user.firstName} ${name.user.patronymic}`,
      })));
    }
  }, [listStudents]);

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

SelectStudent.defaultProps = {
  label: '',
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  error: '',
};

export default SelectStudent;

import { useEffect, useState } from 'react';
import Select from '../index';
import { Option } from '../../../../types';
import { useStudentsContext } from '../../../../context/students';

interface SelectPIB {
  type: 'filter' | 'modal';
  label?: string;
  value: null | number;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const SelectPIB = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  error,
}: SelectPIB): JSX.Element => {
  const [options, setOptions] = useState<Option[]>([]);
  const { createStudents, patchStudentsItem, deleteStudentsItem, getStudents } = useStudentsContext();

  useEffect(() => {
    getStudents?.getStudent({});
  }, [createStudents?.data, patchStudentsItem?.data, deleteStudentsItem?.data]);

  useEffect(() => {
    if (getStudents?.data?.items.length) {
      setOptions(getStudents?.data?.items.map((name) => ({
        value: name.id,
        label: `${name.user.lastName} ${name.user.firstName} ${name.user.patronymic}`,
      })));
    }
  }, [getStudents?.data]);

  return (
    <Select
      type={type}
      label={label}
      onChange={onChange}
      value={value}
      options={options}
      placeholder={placeholder}
      required
      isSearchable
      isClearable
      error={error}
    />
  );
};

SelectPIB.defaultProps = {
  placeholder: '',
  label: '',
  error: '',
};

export default SelectPIB;

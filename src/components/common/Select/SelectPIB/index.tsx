import { useEffect, useState } from 'react';
import Select from '../index';
import { Option } from '../../../../types';
import { useStudentsContext } from '../../../../context/students';

interface SelectCurator {
  type: 'filter' | 'modal';
  label?: string;
  value: string | number;
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
}: SelectCurator): JSX.Element => {
  const [options, setOptions] = useState<Option[]>([]);
  const { createStudents, patchStudentsItem, deleteStudentsItem, getStudents } = useStudentsContext();

  useEffect(() => {
    getStudents?.getStudent({});
  }, [createStudents?.data, patchStudentsItem?.data, deleteStudentsItem?.data]);

  useEffect(() => {
    if (getStudents?.dataStudents?.items.length) {
      setOptions(getStudents?.dataStudents?.items.map((name) => ({
        value: name.id,
        label: `${name.user.firstName} ${name.user.lastName} ${name.user.patronymic}`,
      })));
    }
  }, [getStudents?.dataStudents]);

  return (
    <Select
      type={type}
      label={label}
      onChange={onChange}
      value={value}
      options={options}
      placeholder={placeholder}
      isSearchable
      isClearable
      required
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

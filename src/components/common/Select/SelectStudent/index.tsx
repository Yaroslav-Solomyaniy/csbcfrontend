import { useEffect, useState } from 'react';
import Select from '../index';
import { Option } from '../../../../types';
import { useStudentsContext } from '../../../../context/students';
import { useGetListStudents } from '../../../../hooks/useDropDown';

interface SelectPIB {
  type: 'filter' | 'modal';
  label?: string;
  value: null | number;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const SelectStudent = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  error,
}: SelectPIB): JSX.Element => {
  const { getListStudents, listStudents } = useGetListStudents();
  const [options, setOptions] = useState<Option[]>([]);
  const { createStudents, patchStudentsItem, deleteStudentsItem } = useStudentsContext();

  useEffect(() => {
    getListStudents({});
  }, [createStudents?.data, patchStudentsItem?.data, deleteStudentsItem?.data]);

  useEffect(() => {
    // if (listStudents?.items.length) {
    //   setOptions(listStudents?.items.map((name) => ({
    //     value: name.id,
    //     label: `${name.lastName} ${name.firstName} ${name.patronymic}`,
    //   })));
    // }
  }, [listStudents]);

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

SelectStudent.defaultProps = {
  placeholder: '',
  label: '',
  error: '',
};

export default SelectStudent;

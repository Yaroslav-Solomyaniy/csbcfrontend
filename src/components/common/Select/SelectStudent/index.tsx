import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectTypes } from '../../../../types';
import { StudentsContext } from '../../../../context/Pages/admin/Students';
import { useGetListStudents } from '../../../../hooks/api/all/useDropDowns';
import { AuthContext } from '../../../../context/All/AuthContext';

interface SelectPIB {
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
  isTeacher?: boolean;
  isCurator?:boolean;
}

const SelectStudent = ({
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
  isTeacher,
  isCurator,
}: SelectPIB): JSX.Element => {
  const { getListStudents, listStudents } = useGetListStudents();
  const [options, setOptions] = useState<Option[]>([]);
  const { createStudent, editStudent, deleteStudent } = StudentsContext();
  const { user } = AuthContext();

  useEffect(() => {
    getListStudents((isTeacher && { teacherId: user?.id } || isCurator && { curatorId: user?.id }) || {});
  }, [createStudent?.data, editStudent?.data, deleteStudent?.data]);

  useEffect(() => {
    if (listStudents?.length) {
      setOptions(listStudents?.map((name) => ({
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
      isDisabled={isDisabled}
      isFilter={isFilter}
      menuPlace={menuPlace}
      menuPos={menuPos}
    />
  );
};

SelectStudent.defaultProps = {
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
  isTeacher: false,
  isCurator: false,
};

export default SelectStudent;

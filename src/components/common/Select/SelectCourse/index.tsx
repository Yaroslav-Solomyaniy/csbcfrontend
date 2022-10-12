import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';
import { useGetListCourses } from '../../../../hooks/All/useDropDowns';
import { CoursesContext } from '../../../../context/PagesInAdmin/Courses';
import { AuthContext } from '../../../../context/All/AuthContext';

interface SelectCourse {
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
  isTeacher?: boolean;
}

const SelectCourse = ({
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
}: SelectCourse): JSX.Element => {
  const [options, setOptions] = useState<Option[]>([]);
  const { courseCreate, courseEdit, courseDelete } = CoursesContext();
  const { optionCourses, getListCourses } = useGetListCourses();
  const { user } = AuthContext();

  useEffect(() => {
    getListCourses(isTeacher ? { teacherId: user?.id } : {});
  }, [courseCreate?.data, courseEdit?.data, courseDelete?.data]);

  useEffect(() => {
    if (optionCourses?.length) {
      setOptions(optionCourses.map((course) => ({ value: course.id, label: course.name })));
    }
  }, [optionCourses]);

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

SelectCourse.defaultProps = {
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
};

export default SelectCourse;

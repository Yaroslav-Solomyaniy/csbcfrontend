import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectTypes } from '../../../../types';
import { useGetListCourses } from '../../../../hooks/api/all/useDropDowns';
import { CoursesContext } from '../../../../context/Pages/admin/Courses';
import { AuthContext } from '../../../../context/All/AuthContext';

interface SelectCourse {
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
  const { createCourse, editCourse, deleteCourse } = CoursesContext();
  const { optionCourses, getListCourses } = useGetListCourses();
  const { user } = AuthContext();

  useEffect(() => {
    getListCourses(isTeacher ? { teacherId: user?.id } : {});
  }, [createCourse?.data, editCourse?.data, deleteCourse?.data]);

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

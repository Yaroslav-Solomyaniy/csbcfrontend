import { useEffect, useState } from 'react';
import { Option, SelectTypes } from '../../../../types';
import { useGetListCourses } from '../../../../hooks/api/all/useDropDowns';
import MultiSelect from '../index';
import { CoursesContext } from '../../../../context/Pages/admin/Courses';

interface IMultiSelectCourses {
  label?: string;
  value: string[];
  onChange: (value: Option[]) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
  type: SelectTypes;
}

const MultiSelectCourses = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  error,
}: IMultiSelectCourses): JSX.Element => {
  const { createCourse, editCourse, deleteCourse } = CoursesContext();
  const { optionCourses, getListCourses } = useGetListCourses();
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    getListCourses();
  }, [createCourse?.data, editCourse?.data, deleteCourse?.data]);

  useEffect(() => {
    if (optionCourses?.length) {
      setOptions(optionCourses.map((course) => ({ value: `${course.id}`, label: course.name })));
    }
  }, [optionCourses]);

  return (
    <MultiSelect
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

MultiSelectCourses.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
};

export default MultiSelectCourses;

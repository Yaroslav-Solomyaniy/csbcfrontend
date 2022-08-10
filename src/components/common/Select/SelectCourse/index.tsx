import { useEffect, useState } from 'react';
import Select from '../index';
import { Option, SelectType } from '../../../../types';
import { useGetListCourses } from '../../../../hooks/useDropDown';
import { useCourseContext } from '../../../../context/course';

interface SelectCourse {
  value: string | number | null;
  onChange: (value: string) => void;
  type: SelectType;
  label?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  required?: boolean;
  error?: string;
}

const SelectCourse = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  error,
}: SelectCourse): JSX.Element => {
  const [options, setOptions] = useState<Option[]>([]);
  const { courseCreate, courseEdit, courseDelete } = useCourseContext();
  const { optionCourses, getListCourses } = useGetListCourses();

  useEffect(() => {
    getListCourses();
  }, [courseCreate?.data, courseEdit?.data, courseDelete?.data]);

  useEffect(() => {
    if (optionCourses?.items.length) {
      setOptions(optionCourses.items.map((course) => ({ value: course.id, label: course.name })));
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
    />
  );
};

SelectCourse.defaultProps = {
  label: '',
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  error: '',
};

export default SelectCourse;

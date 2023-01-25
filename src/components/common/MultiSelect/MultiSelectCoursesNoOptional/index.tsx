import { useEffect, useState } from 'react';
import { Option, SelectTypes } from '../../../../types';
import MultiSelect from '../index';
import { CoursesContext } from '../../../../context/Pages/admin/Courses';
import { useGetCourses } from '../../../../hooks/api/admin/courses/useGet';

interface IMultiSelectCoursesNoOptional {
  label?: string;
  value: string[];
  onChange: (value: Option[]) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
  type: SelectTypes;
  typeConduct: 'Загальна' | 'Фахова';
}

const MultiSelectCoursesNoOptional = ({
  type,
  label,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  required,
  error,
  typeConduct,
}: IMultiSelectCoursesNoOptional): JSX.Element => {
  const { createCourse, editCourse, deleteCourse } = CoursesContext();
  const { getCourses, data } = useGetCourses();
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    getCourses(
      { type: ((typeConduct === 'Загальна')
        ? 'Вибіркова загальна компетентність'
        : 'Вибіркова фахова компетентність') },
    );
  }, [createCourse?.data, editCourse?.data, deleteCourse?.data]);

  useEffect(() => {
    if (data?.items.length) {
      setOptions(data.items.map((course) => ({ value: `${course.id}`, label: course.name })));
    }
  }, [data]);

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

MultiSelectCoursesNoOptional.defaultProps = {
  placeholder: '',
  isSearchable: false,
  isClearable: false,
  required: false,
  isFilter: false,
  label: '',
  error: '',
  isCompulsory: null,
};

export default MultiSelectCoursesNoOptional;

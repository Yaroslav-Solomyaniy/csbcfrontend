import { useEffect, useState } from 'react';
import { Option, SelectType } from '../../../../types';
import { useGetListCourses } from '../../../../hooks/useDropDown';
import MultiSelect from '../index';
import { useCourseContext } from '../../../../context/course';

interface IMultiSelectCoursesNoOptional {
  label?: string;
  value: string[];
  onChange: (value: Option[]) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  error?: string;
  required?: boolean;
  type: SelectType;
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
}: IMultiSelectCoursesNoOptional): JSX.Element => {
  const { courseCreate, courseEdit, courseDelete } = useCourseContext();
  const { optionCourses, getListCourses } = useGetListCourses();
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    getListCourses({ isCompulsory: false });
  }, [courseCreate?.data, courseEdit?.data, courseDelete?.data]);

  useEffect(() => {
    if (optionCourses?.items.length) {
      setOptions(optionCourses.items.map((course) => ({ value: `${course.id}`, label: course.name })));
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

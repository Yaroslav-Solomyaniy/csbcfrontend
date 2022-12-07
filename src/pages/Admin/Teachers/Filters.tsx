import React from 'react';
import SelectTeacher from '../../../components/common/Select/SelectTeacher';
import SelectGroupById from '../../../components/common/Select/SelectGroupById';
import SelectCourse from '../../../components/common/Select/SelectCourse';
import { useQueryParam } from '../../../hooks/hooks/useQueryParams';

interface ITeachersFilters{
teacherId: number;
groupId: number;
courseId: number;
}
const TeachersFilters = ({ teacherId, courseId, groupId }:ITeachersFilters) => {
  const { post } = useQueryParam();

  return (
    <>
      <SelectTeacher
        type="filter"
        placeholder="ПІБ"
        required
        isClearable
        isSearchable
        value={teacherId}
        onChange={(value) => post({ teacherId: value, currentPage: 1 })}
        isFilter
      />
      <SelectGroupById
        type="filter"
        placeholder="Група"
        required
        isClearable
        isSearchable
        value={groupId}
        onChange={(value) => post({ groupId: value, currentPage: 1 })}
        isFilter
      />
      <SelectCourse
        type="filter"
        placeholder="Предмет"
        required
        isClearable
        isSearchable
        value={courseId}
        onChange={(value) => post({ courseId: value, currentPage: 1 })}
        isFilter
      />
    </>
  );
};

export default TeachersFilters;

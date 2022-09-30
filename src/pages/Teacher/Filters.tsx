import React from 'react';
import SelectStudent from '../../components/common/Select/SelectStudent';
import SelectGroupById from '../../components/common/Select/SelectGroupById';
import SelectCourse from '../../components/common/Select/SelectCourse';
import { useQueryParam } from '../../hooks/All/useQueryParams';

interface ITeacherFilters{
studentId: number;
groupId: number;
courseId: number;
}

const TeacherFilters = ({ studentId, groupId, courseId }:ITeacherFilters):JSX.Element => {
  const { post } = useQueryParam();

  return (
    <>
      <SelectStudent
        type="filter"
        placeholder="ПІБ"
        onChange={(value) => post({ studentId: value, currentPage: 1 })}
        value={studentId}
        isClearable
        isSearchable
        isTeacher
        isFilter
      />
      <SelectGroupById
        type="filter"
        placeholder="Група"
        onChange={(value) => post({ groupId: value, currentPage: 1 })}
        value={groupId}
        isClearable
        isSearchable
        isTeacher
        isFilter
      />
      <SelectCourse
        type="filter"
        placeholder="Предмет"
        onChange={(value) => post({ courseId: value, currentPage: 1 })}
        value={courseId}
        isClearable
        isSearchable
        isTeacher
        isFilter
      />
    </>
  );
};

export default TeacherFilters;

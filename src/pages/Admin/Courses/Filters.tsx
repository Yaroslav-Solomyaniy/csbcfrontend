import React from 'react';
import SelectCourse from '../../../components/common/Select/SelectCourse';
import SelectTeacher from '../../../components/common/Select/SelectTeacher';
import SelectGroupById from '../../../components/common/Select/SelectGroupById';
import SelectCompulsory from '../../../components/common/Select/SelectTypeCourse';
import { useQueryParam } from '../../../hooks/hooks/useQueryParams';

interface ICoursesFilters{
  courseId: number;
  groupId: number;
  teacherId: number;
  courseType: string | null;
}
const CoursesFilters = ({ courseId, groupId, teacherId, courseType }:ICoursesFilters) => {
  const { post } = useQueryParam();

  return (
    <>
      <SelectCourse
        type="filter"
        placeholder="Предмет"
        onChange={(value) => post({ courseId: value, currentPage: 1 })}
        value={courseId}
        isClearable
        isSearchable
        isFilter
      />
      <SelectTeacher
        type="filter"
        placeholder="Викладач"
        onChange={(value) => post({ teacherId: value, currentPage: 1 })}
        value={teacherId}
        isClearable
        isSearchable
        isFilter
      />
      <SelectGroupById
        type="filter"
        placeholder="Групи"
        onChange={(value) => post({ groupId: value, currentPage: 1 })}
        value={groupId}
        isClearable
        isSearchable
        isFilter
      />
      <SelectCompulsory
        type="filter"
        placeholder="Вид проведення"
        onChange={(value) => post({ courseType: value, currentPage: 1 })}
        value={courseType}
        isClearable
        isFilter
      />
    </>
  );
};

export default CoursesFilters;

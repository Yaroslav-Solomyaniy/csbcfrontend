import React from 'react';
import { useQueryParam } from '../../../../hooks/useUrlParams';
import SelectStudent from '../../../../components/common/Select/SelectStudent';
import SelectGroupById from '../../../../components/common/Select/SelectGroupById';
import SelectIsFullTime from '../../../../components/common/Select/SelectIsFullTime';

interface IStudentsFilters{
  studentId: number;
  groupId: number;
  isFullTime: string;
}
const StudentsFilters = ({ studentId, groupId, isFullTime }:IStudentsFilters) => {
  const { post } = useQueryParam();

  return (
    <>
      <SelectStudent
        type="filter"
        placeholder="ПІБ"
        value={studentId}
        onChange={(value) => post({ studentId: value, currentPage: 1 })}
        isClearable
        isSearchable
        isFilter
      />
      <SelectGroupById
        type="filter"
        placeholder="Група"
        value={groupId}
        onChange={(value) => post({ groupId: value, currentPage: 1 })}
        isClearable
        isSearchable
        isFilter
      />
      <SelectIsFullTime
        type="filter"
        placeholder="Форма навчання"
        value={isFullTime}
        onChange={(value) => {
          post({ isFullTime: value, currentPage: 1 });
        }}
        isFilter
        isSearchable
        isClearable
      />
    </>
  );
};

export default StudentsFilters;

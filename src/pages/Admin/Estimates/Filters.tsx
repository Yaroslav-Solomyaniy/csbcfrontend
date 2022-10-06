import React from 'react';
import { useQueryParam } from '../../../hooks/All/useQueryParams';
import SelectStudent from '../../../components/common/Select/SelectStudent';
import SelectGroupById from '../../../components/common/Select/SelectGroupById';
import SelectSemester from '../../../components/common/Select/SelectSemester';

interface IEstimatesFilters {
  studentId: number;
  semesterId: number | undefined;
  groupId: number;
}

const EstimatesFilters = ({ semesterId, groupId, studentId }: IEstimatesFilters) => {
  const { post } = useQueryParam();

  return (
    <>
      <SelectStudent
        type="filter"
        placeholder="ПІБ"
        isClearable
        isSearchable
        isFilter
        value={studentId}
        onChange={(value) => post({ studentId: value, currentPage: 1 })}
      />
      <SelectGroupById
        type="filter"
        placeholder="Група"
        isClearable
        isSearchable
        isFilter
        value={groupId}
        onChange={(value) => post({ groupId: value, currentPage: 1 })}
      />
      <SelectSemester
        type="filter"
        placeholder="Семестр"
        required
        isClearable
        isFilter
        value={semesterId}
        onChange={(value) => post({ semesterId: value, currentPage: 1 })}
      />
    </>
  );
};

export default EstimatesFilters;

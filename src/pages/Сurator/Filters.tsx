import React from 'react';
import SelectStudent from '../../components/common/Select/SelectStudent';
import SelectGroupById from '../../components/common/Select/SelectGroupById';
import { useQueryParam } from '../../hooks/All/useQueryParams';

interface ICuratorFilters{
  groupId: number;
  studentId: number;
}
const CuratorFilters = ({ groupId, studentId }:ICuratorFilters) => {
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
        isCurator
      />
      <SelectGroupById
        type="filter"
        placeholder="Група"
        isClearable
        isSearchable
        isFilter
        value={groupId}
        onChange={(value) => post({ groupId: value, currentPage: 1 })}
        isCurator
      />
    </>
  );
};

export default CuratorFilters;

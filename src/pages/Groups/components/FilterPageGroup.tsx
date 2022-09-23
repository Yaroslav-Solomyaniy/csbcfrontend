import React from 'react';
import SelectCurator from '../../../components/common/Select/SelectCurator';
import SelectGroupByName from '../../../components/common/Select/SelectGroupByName';
import { useQueryParam } from '../../../hooks/useUrlParams';

interface IPageGroupFilter{
  curator: number;
  group: string;
}
const FilterPageGroup = ({ curator, group }: IPageGroupFilter) => {
  const { post } = useQueryParam();

  return (
    <>
      <SelectCurator
        type="filter"
        placeholder="Куратор"
        onChange={(value) => post({ curatorId: value, currentPage: 1 })}
        value={curator}
        isClearable
        isSearchable
        isFilter
      />
      <SelectGroupByName
        type="filter"
        placeholder="Група"
        onChange={(value) => post({ group: value, currentPage: 1 })}
        value={group}
        isClearable
        isSearchable
        isFilter
      />
    </>
  );
};

export default FilterPageGroup;

import React from 'react';
import SelectCurator from '../../../components/common/Select/SelectCurator';
import SelectGroupByName from '../../../components/common/Select/SelectGroupByName';
import { useQueryParam } from '../../../hooks/All/useQueryParams';

interface IFiltersGroups{
  curator: number;
  group: string;
}
const FiltersGroups = ({ curator, group }: IFiltersGroups) => {
  const { post } = useQueryParam();

  return (
    <>
      <SelectGroupByName
        type="filter"
        placeholder="Група"
        onChange={(value) => post({ group: value, currentPage: 1 })}
        value={group}
        isClearable
        isSearchable
        isFilter
      />
      <SelectCurator
        type="filter"
        placeholder="Куратор"
        onChange={(value) => post({ curatorId: value, currentPage: 1 })}
        value={curator}
        isClearable
        isSearchable
        isFilter
      />

    </>
  );
};

export default FiltersGroups;

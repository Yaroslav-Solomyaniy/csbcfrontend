import React from 'react';
import SelectGroupByName from '../../../../components/common/Select/SelectGroupByName';
import SelectCurator from '../../../../components/common/Select/SelectCurator';
import { useQueryParam } from '../../../../hooks/useUrlParams';

interface ICuratorsFilters{
  groupName: string;
  curatorId: number;
}
const CuratorsFilters = ({ groupName, curatorId }:ICuratorsFilters) => {
  const { post } = useQueryParam();

  return (
    <>
      <SelectGroupByName
        type="filter"
        placeholder="Група"
        onChange={(value) => post({ groupName: value, currentPage: 1 })}
        value={groupName}
        isClearable
        isSearchable
        isFilter
      />
      <SelectCurator
        type="filter"
        placeholder="ПІБ"
        onChange={(value) => post({ curatorId: value, currentPage: 1 })}
        value={curatorId}
        isClearable
        isSearchable
        isFilter
      />
    </>
  );
};

export default CuratorsFilters;

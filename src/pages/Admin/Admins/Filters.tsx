import React from 'react';
import SelectAdministrator from '../../../components/common/Select/SelectAdministrator';
import { useQueryParam } from '../../../hooks/hooks/useQueryParams';

interface IAdministratorsFilters{
adminId: number;
}

const AdministratorsFilters = ({ adminId }:IAdministratorsFilters) => {
  const { post } = useQueryParam();

  return (
    <SelectAdministrator
      type="filter"
      placeholder="ПІБ"
      onChange={(value) => post({ adminId: value, currentPage: 1 })}
      value={adminId}
      isClearable
      isSearchable
      isFilter
    />
  );
};

export default AdministratorsFilters;

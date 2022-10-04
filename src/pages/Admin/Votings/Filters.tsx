import React from 'react';
import SelectGroupById from '../../../components/common/Select/SelectGroupById';
import SelectStatusVoting from '../../../components/common/Select/SelectStatusVoting';
import { useQueryParam } from '../../../hooks/All/useQueryParams';

interface IVotingFilters{
groupId: number;
statusMessage: string;
}
const VotingFilters = ({ groupId, statusMessage }:IVotingFilters) => {
  const { post } = useQueryParam();

  return (
    <>
      <SelectGroupById
        type="filter"
        placeholder="Група"
        onChange={(value) => post({ groupId: value, currentPage: 1 })}
        value={groupId}
        isClearable
        isSearchable
        isFilter
      />
      <SelectStatusVoting
        type="filter"
        placeholder="Статус"
        onChange={(value) => post({ statusMessage: value, currentPage: 1 })}
        value={statusMessage}
        isClearable
        isFilter
      />

    </>
  );
};

export default VotingFilters;

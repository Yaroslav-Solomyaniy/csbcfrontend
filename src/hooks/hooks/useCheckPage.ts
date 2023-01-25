import { useEffect } from 'react';
import { IPagination } from '../../types';
import { useQueryParam } from './useQueryParams';

interface IUseCheckPage{
  pagination: IPagination;
  currentPage: number;
}

const useCheckPage = ({ pagination, currentPage }:IUseCheckPage) => {
  const { post } = useQueryParam();

  useEffect(() => {
    if (currentPage > pagination.totalPages) {
      post({ currentPage: pagination.totalPages });
    }
  }, [pagination]);
};

export default useCheckPage;

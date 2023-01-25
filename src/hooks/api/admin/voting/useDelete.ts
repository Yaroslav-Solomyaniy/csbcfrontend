import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import $api from '../../config';

export interface IUseDeleteVoting {
  data: FetchSuccess | null;
  deleteVoting: (id: number) => void;
}

export const useDeleteVoting = (): IUseDeleteVoting => {
  const [data, setData] = useState<FetchSuccess | null>(null);

  const deleteVoting = (id: number) => {
    $api.delete(`/voting/${id}`)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, deleteVoting };
};

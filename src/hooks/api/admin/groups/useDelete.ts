import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import $api from '../../config';

export interface IUseDeleteGroup {
  data: FetchSuccess | null;
  deleteGroup: (id: number) => void;
}

export const useDeleteGroup = (): IUseDeleteGroup => {
  const [data, setData] = useState<FetchSuccess | null>(null);

  const deleteGroup = (id: number) => {
    $api.delete(`/groups/${id}`)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, deleteGroup };
};

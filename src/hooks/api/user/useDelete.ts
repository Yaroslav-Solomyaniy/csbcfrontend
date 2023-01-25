import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../types';
import $api from '../config';

export interface IUseDeleteUser {
  data: FetchSuccess | null;
  deleteUser: (id: number) => void;
}

export const useDeleteUser = (): IUseDeleteUser => {
  const [data, setData] = useState<FetchSuccess | null>(null);

  const deleteUser = (id: number) => {
    $api.delete(`/users/${id}`)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, deleteUser };
};

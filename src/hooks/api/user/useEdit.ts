import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../types';
import $api from '../config';

export interface IEditUserParams {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface IUseEditUser {
  data: FetchSuccess | null;
  editUser: (params: IEditUserParams, id: number) => void;
}

export const useEditUser = (): IUseEditUser => {
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editUser = (params: IEditUserParams, id: number) => {
    $api.patch(`/users/${id}`, params)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, editUser };
};

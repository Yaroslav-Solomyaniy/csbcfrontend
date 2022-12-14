import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../config';

interface IGetUserByIdParams {
  id: string;
}

interface IGetUserByIdData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface IUseGetUserById {
  data: IGetUserByIdData | null;
  getUserById: (params: IGetUserByIdParams) => void;
}

export const useGetUserById = (): IUseGetUserById => {
  const [data, setData] = useState<IGetUserByIdData | null>(null);

  const getUserById = (params: IGetUserByIdParams) => {
    $api.get(`/users/${params.id}`)
      .then((response: AxiosResponse<IGetUserByIdData | null>) => {
        setData(response.data);
      });
  };

  return { data, getUserById };
};

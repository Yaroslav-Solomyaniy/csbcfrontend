import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../types';
import $api from '../config';

export interface IGetUserParams {
  orderByColumn?: 'id' | ' firstName' | 'lastName' | 'email' | 'updated' | 'created' | 'role';
  orderBy?: OrderBy;
  search?: string;
  id?: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export interface IGetUserData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
}

export interface IUseGetUser {
  data: IPaginateData<IGetUserData> | null;
  getUser: (params?: IGetUserParams) => void;
}

export const useGetUser = (): IUseGetUser => {
  const [data, setData] = useState<IPaginateData<IGetUserData> | null>(null);

  const getUser = (params?: IGetUserParams) => {
    $api.get('/users', {
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetUserData> | null>) => {
        setData(response.data);
      });
  };

  return { data, getUser };
};

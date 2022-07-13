import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../types';
import { useAuthContext } from '../context/useAuthContext';
import { role } from '../enums/role';

export interface IGetCuratorParams {
  orderByColumn?:
    | 'id'
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'role'
    | 'created'
    | 'updated';
  orderBy?: OrderBy;
  search?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export interface IGetCuratorData {
  id: 0;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
}

export interface IUseCuratorGet {
  data: IPaginateData<IGetCuratorData> | null;
  getCurators: (params?: IGetCuratorParams) => void;
}

export const useCuratorsGet = (): IUseCuratorGet => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IPaginateData<IGetCuratorData> | null>(null);

  const getCurators = (params?: IGetCuratorParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${role[2]}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'id', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetCuratorData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { data, getCurators };
};

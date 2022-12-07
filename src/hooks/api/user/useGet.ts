import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../types';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';

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
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetUserData> | null>(null);

  const getUser = (params?: IGetUserParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetUserData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getUser };
};

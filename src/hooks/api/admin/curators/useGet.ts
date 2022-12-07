import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

type orderByColumn = 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'created' | 'updated';
export interface IGetCuratorParams {
  orderByColumn?: orderByColumn;
  groupName?: string;
  curatorId?: number;
  orderBy?: OrderBy;
  page?: number;
  limit?: number;
}

export interface IGetCuratorData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  groups: { name: string; }[];
}

export interface IUseGetCurators {
  data: IPaginateData<IGetCuratorData> | null;
  getCurators: (params?: IGetCuratorParams) => void;
}

export const useGetCurators = (): IUseGetCurators => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetCuratorData> | null>(null);

  const getCurators = (params?: IGetCuratorParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/curator`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        orderByColumn: 'created',
        orderBy: 'DESC',
        ...params,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGetCuratorData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getCurators };
};

import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../../types';
import $api from '../../config';

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
  const [data, setData] = useState<IPaginateData<IGetCuratorData> | null>(null);

  const getCurators = (params?: IGetCuratorParams) => {
    $api.get('/users/curator', {
      params: {
        orderByColumn: 'created',
        orderBy: 'DESC',
        ...params,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGetCuratorData> | null>) => {
        setData(response.data);
      });
  };

  return { data, getCurators };
};

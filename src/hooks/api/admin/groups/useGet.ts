import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../../types';

import { IUser } from '../../interfaces';
import $api from '../../config';

type orderByColumn = | 'id' | 'Name' | 'curator_id' | 'order_number' | 'deleted_order_number' | 'created' | 'updated';
export interface IGetGroupParams {
  orderByColumn?:orderByColumn;
  orderBy?: OrderBy;
  search?: string;
  name?: string;
  curatorId?: number;
  orderNumber?: string;
  deletedOrderNumber?: string;
  page?: number;
  limit?: number;
}

export interface IGetGroupData {
  id: number;
  name: string;
  curator: IUser;
  orderNumber: string;
  students: number;
}

export interface IUseGetGroups {
  data: IPaginateData<IGetGroupData> | null;
  getGroups: (params?: IGetGroupParams) => void;
}

export const useGetGroups = (): IUseGetGroups => {
  const [data, setData] = useState<IPaginateData<IGetGroupData> | null>(null);

  const getGroups = (params?: IGetGroupParams) => {
    $api.get('/groups', {
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetGroupData> | null>) => {
        setData(response.data);
      });
  };

  return { data, getGroups };
};

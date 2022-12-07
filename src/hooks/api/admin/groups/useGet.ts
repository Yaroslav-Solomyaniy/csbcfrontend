import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { IUser } from '../../interfaces';

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
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetGroupData> | null>(null);

  const getGroups = (params?: IGetGroupParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetGroupData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getGroups };
};

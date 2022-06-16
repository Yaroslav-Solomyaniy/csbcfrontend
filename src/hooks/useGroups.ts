import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { IPaginateData, OrderBy } from '../types';

interface IGetGroupParams {
  orderByColumn?:
    | 'id'
    | 'Name'
    | 'curator_id'
    | 'order_number'
    | 'deleted_order_number'
    | 'created'
    | 'updated';
  orderBy?: OrderBy;
  search?: string;
  name?: string;
  curatorId?: number;
  orderNumber?: string;
  deletedOrderNumber?: string;
  page?: number;
  limit?: number;
}

export interface IGroupData {
  'id': number;
  'name': string;
  'curator': {
    'id': number;
    'firstName': string;
    'lastName': string;
    'email': string;
    'role': string;
    'updated': string;
    'created': string;
  };
  'orderNumber': string;
  'updated': string;
  'created': string;
}

interface IUseGroups {
  data: IPaginateData<IGroupData> | null;
  getGroups: (params?: IGetGroupParams) => void;
}

const useGroups = (): IUseGroups => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IPaginateData<IGroupData> | null>(null);

  const getGroups = (params?: IGetGroupParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGroupData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { data, getGroups };
};

export default useGroups;

import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../../config';

interface IGetGroupByIdParams {
  id: string;
}

interface ICurator{
  id: number;
  firstName: string;
  lastName: string;
}

interface IGetGroupByIdData {
  created: string;
  curator: ICurator;
  deletedOrderNumber: null;
  id: number;
  name: string;
  orderNumber: string;
  updated: string;
}

export interface IUseGetGroupById {
  data: IGetGroupByIdData | null;
  getGroupById: (params: IGetGroupByIdParams) => void;
}

export const useGetGroupById = (): IUseGetGroupById => {
  const [data, setData] = useState<IGetGroupByIdData | null>(null);

  const getGroupById = (params: IGetGroupByIdParams) => {
    $api.get(`/groups/${params.id}`)
      .then((response: AxiosResponse<IGetGroupByIdData | null>) => {
        setData(response.data);
      });
  };

  return { data, getGroupById };
};

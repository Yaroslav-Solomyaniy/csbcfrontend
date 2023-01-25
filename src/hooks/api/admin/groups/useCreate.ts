import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../../config';

export interface ICreateGroupParams {
  name: string;
  curatorId: number;
  orderNumber: string;
}

interface ICreateGroupData {
  id: number;
  name: string;
}

export interface IUseCreateGroup {
  data: ICreateGroupData | null;
  createGroup: (params: ICreateGroupParams) => void;
}

export const useCreateGroup = (): IUseCreateGroup => {
  const [data, setData] = useState<ICreateGroupData | null>(null);

  const createGroup = (params: ICreateGroupParams) => {
    $api.post('/groups', params)
      .then((response: AxiosResponse<ICreateGroupData>) => {
        setData(response.data);
      });
  };

  return { data, createGroup };
};

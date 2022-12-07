import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { MessagesContext } from '../../../../context/All/Messages';
import { AuthContext } from '../../../../context/All/AuthContext';

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
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [data, setData] = useState<ICreateGroupData | null>(null);

  const createGroup = (params: ICreateGroupParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/groups`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<ICreateGroupData>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, createGroup };
};

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { MessagesContext } from '../../../../context/All/Messages';
import { AuthContext } from '../../../../context/All/AuthContext';

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
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [data, setData] = useState<IGetGroupByIdData | null>(null);

  const getGroupById = (params: IGetGroupByIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetGroupByIdData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getGroupById };
};

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';

interface IGetUserByIdParams {
  id: string;
}

interface IGetUserByIdData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface IUseGetUserById {
  data: IGetUserByIdData | null;
  getUserById: (params: IGetUserByIdParams) => void;
}

export const useGetUserById = (): IUseGetUserById => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetUserByIdData | null>(null);

  const getUserById = (params: IGetUserByIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetUserByIdData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getUserById };
};

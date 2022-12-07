import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';

export interface ICreateUserParams {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface ICreateUserData {
  id: number;
  name: string;
  role: string;
}

export interface IUseCreateUser {
  data: ICreateUserData | null;
  createUser: (params: ICreateUserParams) => void;
}

export const useCreateUser = (): IUseCreateUser => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<ICreateUserData | null>(null);

  const createUser = (params: ICreateUserParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<ICreateUserData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, createUser };
};

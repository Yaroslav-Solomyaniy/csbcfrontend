import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../config';

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
  const [data, setData] = useState<ICreateUserData | null>(null);

  const createUser = (params: ICreateUserParams) => {
    $api.post('/users', params)
      .then((response: AxiosResponse<ICreateUserData | null>) => {
        setData(response.data);
      });
  };

  return { data, createUser };
};

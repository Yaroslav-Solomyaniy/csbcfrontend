import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { IStudentData } from './interfaces/IStudentData';

interface IGetStudentByIdParams {
  id: number;
}

export interface IUseGetStudentById {
  data: IStudentData | null;
  getStudentById: (params: IGetStudentByIdParams) => void;
}

export const useGetStudentById = (): IUseGetStudentById => {
  const { user } = AuthContext();
  const [data, setData] = useState<IStudentData | null>(null);
  const { addErrors } = MessagesContext();

  const getStudentById = (params: IGetStudentByIdParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<IStudentData>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, getStudentById };
};

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { ICreateStudentParams } from './interfaces/ICreateStudentParams';

interface ICreateStudentData {
  id: number;
}

export interface IUseCreateStudent {
  data: ICreateStudentData | null;
  createStudent: (params: ICreateStudentParams) => void;
}

export const useCreateStudent = (): IUseCreateStudent => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<ICreateStudentData | null>(null);

  const createStudent = (params: ICreateStudentParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/students`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<ICreateStudentData>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, createStudent };
};

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';
import { IGetTeacherData } from './useGet';

export interface IUseGetTeacherById {
  data:IGetTeacherData | null;
  getTeacherById: (id:number) => void;
}

export const useGetTeacherById = (): IUseGetTeacherById => {
  const { user } = AuthContext();
  const [data, setData] = useState<IGetTeacherData| null>(null);
  const { addErrors } = MessagesContext();

  const getTeacherById = (id:number): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/teacher/page/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<IGetTeacherData>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, getTeacherById };
};

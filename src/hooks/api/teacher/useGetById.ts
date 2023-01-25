import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IGetTeacherData } from './useGet';
import $api from '../config';

export interface IUseGetTeacherById {
  data:IGetTeacherData | null;
  getTeacherById: (id:number) => void;
}

export const useGetTeacherById = (): IUseGetTeacherById => {
  const [data, setData] = useState<IGetTeacherData| null>(null);

  const getTeacherById = (id:number): void => {
    $api.get(`/users/teacher/page/${id}`).then((response: AxiosResponse<IGetTeacherData>) => {
      setData(response.data);
    });
  };

  return { data, getTeacherById };
};

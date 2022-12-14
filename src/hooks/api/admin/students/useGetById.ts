import { useState } from 'react';
import { AxiosResponse } from 'axios';

import { IStudentData } from './interfaces/IStudentData';
import $api from '../../config';

interface IGetStudentByIdParams {
  id: number;
}

export interface IUseGetStudentById {
  data: IStudentData | null;
  getStudentById: (params: IGetStudentByIdParams) => void;
}

export const useGetStudentById = (): IUseGetStudentById => {
  const [data, setData] = useState<IStudentData | null>(null);

  const getStudentById = (params: IGetStudentByIdParams): void => {
    $api.get(`/students/${params.id}`).then((response: AxiosResponse<IStudentData>) => {
      setData(response.data);
    });
  };

  return { data, getStudentById };
};

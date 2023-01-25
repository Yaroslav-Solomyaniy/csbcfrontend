import { useState } from 'react';
import { AxiosResponse } from 'axios';

import { ICreateStudentParams } from './interfaces/ICreateStudentParams';
import $api from '../../config';

interface ICreateStudentData {
  id: number;
}

export interface IUseCreateStudent {
  data: ICreateStudentData | null;
  createStudent: (params: ICreateStudentParams) => void;
}

export const useCreateStudent = (): IUseCreateStudent => {
  const [data, setData] = useState<ICreateStudentData | null>(null);

  const createStudent = (params: ICreateStudentParams) => {
    $api.post('/students', params)
      .then((response: AxiosResponse<ICreateStudentData>) => {
        setData(response.data);
      });
  };

  return { data, createStudent };
};

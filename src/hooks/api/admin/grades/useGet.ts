import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IPaginateData } from '../../../../types';

import { IGetGradesData } from './interfaces/IGetGradesData';
import $api from '../../config';

export interface IGetGradesParams {
  orderByColumn?: string;
  orderBy?: string;
  search?: string;
  semester?: number;
  studentId?: number;
  courseId?: number;
  groupId?: number;
  grade?: number;
  page?: number;
  limit?: number;
}

export interface IUseGetGrades {
  data: IPaginateData<IGetGradesData> | null;
  getGrades: (params?: IGetGradesParams) => void;
}

export const useGetGrades = (): IUseGetGrades => {
  const [data, setData] = useState<IPaginateData<IGetGradesData> | null>(null);

  const getGrades = (params?: IGetGradesParams) => {
    $api.get('/grades', {
      params: {
        orderBy: 'DESC',
        ...params,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGetGradesData> | null>) => {
        setData(response.data);
      });
  };

  return { data, getGrades };
};

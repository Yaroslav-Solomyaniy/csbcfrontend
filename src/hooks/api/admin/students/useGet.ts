import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../../types';

import { IStudentData } from './interfaces/IStudentData';
import $api from '../../config';

// eslint-disable-next-line max-len
type orderByColumn = | 'id' | 'dateOfBirth' | 'groupId' | 'studentId' | 'orderNumber' | 'edeboId' | 'isFullTime' | 'updated' | 'created';

export interface IGetStudentsParams {
  orderByColumn?:orderByColumn;
  id?: number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  orderBy?: OrderBy;
  search?: string;
  group?: number;
  orderNumber?: string;
  edeboId?: string;
  isFullTime?: boolean | null;
  page?: number;
  limit?: number;
}

export interface IUseGetStudents {
  data: IPaginateData<IStudentData> | null;
  getStudents: (params: IGetStudentsParams) => void;
}

export const useGetStudents = (): IUseGetStudents => {
  const [data, setData] = useState<IPaginateData<IStudentData> | null>(null);

  const getStudents = (params: IGetStudentsParams): void => {
    $api.get('/students', {
      params: {
        orderByColumn: 'created',
        orderBy: 'DESC',
        ...params,
      },
    }).then((response: AxiosResponse<IPaginateData<IStudentData> | null>) => {
      setData(response.data);
    });
  };

  return { data, getStudents };
};

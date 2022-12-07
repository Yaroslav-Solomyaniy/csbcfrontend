import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { IStudentData } from './interfaces/IStudentData';

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
  const { user } = AuthContext();
  const [data, setData] = useState<IPaginateData<IStudentData> | null>(null);
  const { addErrors } = MessagesContext();

  const getStudents = (params: IGetStudentsParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        orderByColumn: 'created',
        orderBy: 'DESC',
        ...params,
      },
    }).then((response: AxiosResponse<IPaginateData<IStudentData> | null>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, getStudents };
};

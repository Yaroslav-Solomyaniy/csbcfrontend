import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { IGetGradesData } from './interfaces/IGetGradesData';

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
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetGradesData> | null>(null);

  const getGrades = (params?: IGetGradesParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        orderBy: 'DESC',
        ...params,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGetGradesData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getGrades };
};

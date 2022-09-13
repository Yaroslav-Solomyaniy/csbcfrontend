import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../types';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';

export interface IGetHistoryGradesParams {
 semester?: number;
  orderBy?: OrderBy;
  studentId?: number;
  userId?: number;
  courseId?: number;
  grade?: number;
  reasonOfChange?: string;
  name?: string;
}

export interface IGetHistoryGradesData {
      id: number;
      user: {
        id: number;
        firstName: string;
        lastName: string;
        patronymic: string;
      };
      group: {
        id: number;
        name: string;
      };
      gradesHistories:
        {
          id: number;
          grade: number;
          course: {
            id:number;
            name:string;
          };
          userChanged: {
            id: number;
            firstName: string;
            lastName:string;
            patronymic:string;
          };
          createdAt: string;
          reasonOfChange: string;
        }[];
}
export interface IUseGetHistoryGrades{
  data: IGetHistoryGradesData | null;
  getHistoryGrades: (params?: IGetHistoryGradesParams) => void;
}

export const useGetHistoryGrades = (): IUseGetHistoryGrades => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IGetHistoryGradesData| null>(null);

  const getHistoryGrades = (params?: IGetHistoryGradesParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades-history`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params,
    })
      .then((response: AxiosResponse<IGetHistoryGradesData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getHistoryGrades };
};

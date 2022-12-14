import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { OrderBy } from '../../../types';
import { IGroupNoOrder, IUserNoMail } from '../interfaces';
import $api from '../config';

export interface IGetHistoryGradesParams {
  semester?: number;
  orderBy?: OrderBy;
  orderByColumn?: 'GradeHistory_Student.createdAt';
  studentId?: number;
  userId?: number;
  courseId?: number;
  grade?: number;
  reasonOfChange?: string;
  name?: string;
}

export interface IGetHistoryGradesData {
  id: number;
  user: IUserNoMail;
  group: IGroupNoOrder;
  gradesHistories: IGradesHistories[];
}

export interface IGradesHistories {
  id: number;
  grade: number;
  course: {
    id: number;
    name: string;
  };
  userChanged:IUserNoMail;
  createdAt: string;
  reasonOfChange: string;
}

export interface IUseGetHistoryGrades {
  data: IGetHistoryGradesData[];
  getHistoryGrades: (params?: IGetHistoryGradesParams) => void;
}

export const useGetHistoryGrades = (): IUseGetHistoryGrades => {
  const [data, setData] = useState<IGetHistoryGradesData[]>([]);

  const getHistoryGrades = (params?: IGetHistoryGradesParams) => {
    $api.get('/grades-history', {
      params: { orderByColumn: 'GradeHistory_Student.createdAt', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IGetHistoryGradesData[]>) => setData(response.data));
  };

  return { data, getHistoryGrades };
};

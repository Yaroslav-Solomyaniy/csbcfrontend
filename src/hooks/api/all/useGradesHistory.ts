import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { OrderBy } from '../../../types';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';
import { IGroupNoOrder, IUserNoMail } from '../interfaces';

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
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetHistoryGradesData[]>([]);

  const getHistoryGrades = (params?: IGetHistoryGradesParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades-history`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'GradeHistory_Student.createdAt', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IGetHistoryGradesData[]>) => setData(response.data))
      .catch((error) => addErrors(error.response.data.message));
  };

  return { data, getHistoryGrades };
};

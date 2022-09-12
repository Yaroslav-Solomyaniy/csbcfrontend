import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';
import { IStudentData } from './useStudents';
import { IPaginateData, OrderBy } from '../types';

export interface IGetPageTeacherParams {
  orderByColumn?:
    | 'id'
    | 'firstname'
    | 'lastName'
    | 'email'
    | 'role'
    | 'created'
    | 'updated';
  orderBy?: OrderBy;
  studentId?:number;
  groupId?: number;
  courseId?: number;
  page?: number;
  limit?: number;
}
export interface IGetPageTeacherData {
  id: number;
  student: {
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
  };
  course: {
    id: number;
    name: string;
  };
  grade: number;
}

export interface IUsePageTeacherGet {
  data: IPaginateData<IGetPageTeacherData> | null;
  pageTeacherGet: (params?: IGetPageTeacherParams) => void;
}

export const UsePageTeacherGet = (): IUsePageTeacherGet => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IPaginateData<IGetPageTeacherData> | null>(null);
  const { addErrors } = useMessagesContext();

  const pageTeacherGet = (params?: IGetPageTeacherParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/teacher/page`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      // params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    }).then((response: AxiosResponse<IPaginateData<IGetPageTeacherData>>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, pageTeacherGet };
};

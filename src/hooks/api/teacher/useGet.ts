import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';
import { IPaginateData, OrderBy } from '../../../types';
import { ICourseIdAndName, IGroupNoOrder, IUserNoMail } from '../interfaces';

type orderByColumn = | 'id' | 'firstname' | 'lastName' | 'email' | 'role' | 'created' | 'updated';
export interface IGetTeacherParams {
  orderByColumn?:orderByColumn;
  orderBy?: OrderBy;
  studentId?:number;
  groupId?: number;
  courseId?: number;
  page?: number;
  limit?: number;
}

interface IStudent {
  id: number;
  user: IUserNoMail;
  group: IGroupNoOrder;
}

export interface IGetTeacherData {
  id: number;
  student: IStudent;
  course: ICourseIdAndName;
  grade: number;
}

export interface IUseGetTeacher {
  data: IPaginateData<IGetTeacherData> | null;
  getTeacher: (params?: IGetTeacherParams) => void;
}

export const useGetTeacher = (): IUseGetTeacher => {
  const { user } = AuthContext();
  const [data, setData] = useState<IPaginateData<IGetTeacherData> | null>(null);
  const { addErrors } = MessagesContext();

  const getTeacher = (params?: IGetTeacherParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/teacher/page`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderBy: 'DESC', ...params },
    }).then((response: AxiosResponse<IPaginateData<IGetTeacherData>>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, getTeacher };
};

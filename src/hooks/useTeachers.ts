import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../types';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';

export interface IGetTeacherParams {
  teacherId?: number;
  groups: string | number;
  courses: string | number;
  orderByColumns?:
    'id'
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'role'
    | 'created'
    | 'updated';
  orderBy?: OrderBy;
  page?: number;
  limit?: number;
}

export interface IGetTeacherData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  courses: IGetTeacherDataCourses[];
}

interface IGetTeacherDataCourses {
  id: number;
  name: string;
  credits: number;
  lectureHours: number;
  isActive: boolean;
  semester: number;
  isCompulsory: boolean;
  isExam: boolean;
  groups: {
    id: number;
    name: string;
    orderNumber: string;
  }[];
}

export interface IUseTeachersGet {
  data: IPaginateData<IGetTeacherData> | null;
  getTeacher: (params?: IGetTeacherParams) => void;
}

export const useTeacherGet = (): IUseTeachersGet => {
  const { addErrors } = useMessagesContext();
  const { user } = useAuthContext();
  const [data, setData] = useState<IPaginateData<IGetTeacherData> | null>(null);

  const getTeacher = (params?: IGetTeacherParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/teacher`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetTeacherData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getTeacher };
};

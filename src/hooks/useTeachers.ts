import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../types';
import { useAuthContext } from '../context/useAuthContext';

export interface IGetTeacherParams {
  orderBy?: OrderBy;
  page?: number;
  limit?: number;
}

interface IGetTeacherDataCoursesGroups {
  id: number;
  name: string;
  orderNumber: string;
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
  groups: IGetTeacherDataCoursesGroups[];
}

export interface IGetTeacherData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  courses: IGetTeacherDataCourses[];
}

export interface IUseTeachersGet {
  data: IPaginateData<IGetTeacherData> | null;
  getTeacher: (params?: IGetTeacherParams) => void;
}

export const useTeacherGet = (): IUseTeachersGet => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IPaginateData<IGetTeacherData> | null>(null);

  const getTeacher = (params?: IGetTeacherParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/teacher/courses`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'id', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetTeacherData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { data, getTeacher };
};

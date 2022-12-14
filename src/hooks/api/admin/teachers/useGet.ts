import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../../types';

import { IGroup } from '../../interfaces';
import $api from '../../config';

type orderByColumn = 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'created' | 'updated';
export interface IGetTeachersParams {
  teacherId?: number;
  groups?: string | number;
  courses?: string | number;
  orderByColumn?:orderByColumn;
  orderBy?: OrderBy;
  page?: number;
  limit?: number;
}

export interface IGetTeachersData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  courses: IGetTeachersDataCourses[];
}

interface IGetTeachersDataCourses {
  id: number;
  name: string;
  credits: number;
  lectureHours: number;
  isActive: boolean;
  semester: number;
  isCompulsory: boolean;
  isExam: boolean;
  groups: IGroup[];
}

export interface IUseGetTeachers {
  data: IPaginateData<IGetTeachersData> | null;
  getTeachers: (params?: IGetTeachersParams) => void;
}

export const useGetTeachers = (): IUseGetTeachers => {
  const [data, setData] = useState<IPaginateData<IGetTeachersData> | null>(null);

  const getTeachers = (params?: IGetTeachersParams) => {
    $api.get('/users/teacher', {

      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetTeachersData> | null>) => {
        setData(response.data);
      });
  };

  return { data, getTeachers };
};

import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../types';
import { ICourseIdAndName, IGroupNoOrder, IUserNoMail } from '../interfaces';
import $api from '../config';

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
  const [data, setData] = useState<IPaginateData<IGetTeacherData> | null>(null);

  const getTeacher = (params?: IGetTeacherParams): void => {
    $api.get('/users/teacher/page', {
      params: { orderBy: 'DESC', ...params },
    }).then((response: AxiosResponse<IPaginateData<IGetTeacherData>>) => {
      setData(response.data);
    });
  };

  return { data, getTeacher };
};

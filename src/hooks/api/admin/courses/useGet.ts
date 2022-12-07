import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { CourseTypes, IPaginateData, OrderBy } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { IGroup, IUser } from '../../interfaces';

// PARAMS
// eslint-disable-next-line max-len
type OrderByColumn = 'id' | 'Name' | 'credits'| 'lectureHours' | 'isActive' | 'semester' | 'isCompulsory' | 'teacher' | 'groups' | 'created' |'updated';
export interface IGetCoursesParams {
  orderByColumn?:OrderByColumn;
  orderBy?: OrderBy;
  id?: number;
  search?: string;
  name?: string;
  credits?: number;
  lectureHours?: number;
  isExam?: boolean;
  isActive?: boolean;
  semester?: number;
  type?: string;
  teacher?: number;
  groups?: number;
  page?: number;
  limit?: number;
}
// DATA
export interface IGetCoursesData {
  id: number;
  name: string;
  credits: number;
  lectureHours: number;
  isActive: boolean;
  semester: number;
  isExam: boolean;
  type: CourseTypes;
  teacher: IUser;
  groups: IGroup[];
}
// HOOK INTERFACE
export interface IUseGetCourses {
  data: IPaginateData<IGetCoursesData> | null;
  getCourses: (params?: IGetCoursesParams) => void;
}

// HOOK
export const useGetCourses = (): IUseGetCourses => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetCoursesData> | null>(null);

  const getCourses = (params?: IGetCoursesParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetCoursesData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getCourses };
};

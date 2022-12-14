import { useState } from 'react';
import { AxiosResponse } from 'axios';

import { IGroup, IUser } from '../../interfaces';
import $api from '../../config';

interface IGetCourseIdParams {
  id: string;
}

interface IGetCourseIdData {
  name: string;
  credits: number | string;
  lectureHours: number | string;
  isActive: boolean;
  semester: number;
  type: string;
  isExam: string;
  teacher: IUser;
  groups:IGroup[];
}

export interface IUseGetCourseById {
  data: IGetCourseIdData | null;
  getCourseById: (params: IGetCourseIdParams) => void;
}

export const useGetCourseById = (): IUseGetCourseById => {
  const [data, setData] = useState<IGetCourseIdData | null>(null);

  const getCourseById = (params: IGetCourseIdParams) => {
    $api.get(`/courses/${params.id}`)
      .then((response: AxiosResponse<IGetCourseIdData | null>) => {
        setData(response.data);
      });
  };

  return { data, getCourseById };
};

import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { ICoursesParams } from '../../interfaces';
import $api from '../../config';

export interface ICreateCourseData {
  id: string;
}

export interface IUseCreateCourse {
  data: ICreateCourseData | null;
  createCourse: (params: ICoursesParams) => void;
}

export const useCreateCourse = (): IUseCreateCourse => {
  const [data, setData] = useState<ICreateCourseData | null>(null);
  const createCourse = (params: ICoursesParams) => {
    $api.post('/courses', params)
      .then((response: AxiosResponse<ICreateCourseData | null>) => {
        setData(response.data);
      });
  };

  return { data, createCourse };
};

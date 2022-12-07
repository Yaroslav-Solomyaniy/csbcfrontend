import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { ICoursesParams } from '../../interfaces';

export interface ICreateCourseData {
  id: string;
}

export interface IUseCreateCourse {
  data: ICreateCourseData | null;
  createCourse: (params: ICoursesParams) => void;
}

export const useCreateCourse = (): IUseCreateCourse => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<ICreateCourseData | null>(null);

  const createCourse = (params: ICoursesParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/courses`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<ICreateCourseData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.message);
      });
  };

  return { data, createCourse };
};

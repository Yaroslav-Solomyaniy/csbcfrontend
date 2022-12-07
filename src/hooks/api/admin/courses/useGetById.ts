import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { IGroup, IUser } from '../../interfaces';

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
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetCourseIdData | null>(null);

  const getCourseById = (params: IGetCourseIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetCourseIdData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getCourseById };
};

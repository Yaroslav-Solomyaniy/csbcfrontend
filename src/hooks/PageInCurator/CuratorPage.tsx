import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData } from '../../types';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';

export interface IGetCuratorInfoParams {
  courseId?: number;
  groupId?: number;
  semester?: number;
  limit?: number;
}

export interface IGetCuratorData {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
  };
  grades: {
    id: number;
    grade: number;
    course: {
      id: number;
      name: string;
    };
  } [];
  group: {
    id: number;
    name: string;
    orderNumber: string;
  };
}

export interface IUseGetCuratorPage {
  data: IPaginateData<IGetCuratorData> | null;
  getCuratorPage: (params?: IGetCuratorInfoParams) => void;
}

export const useGetCuratorPage = (): IUseGetCuratorPage => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetCuratorData> | null>(null);

  const getCuratorPage = (params?: IGetCuratorInfoParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/curator/page`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        orderBy: 'DESC',
        ...params,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGetCuratorData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getCuratorPage };
};

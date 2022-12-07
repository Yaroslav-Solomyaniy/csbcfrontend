import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData } from '../../../types';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';
import { ICourseIdAndName, IGroup, IUserNoMail } from '../interfaces';

export interface IGetCuratorParams {
  courseId?: number;
  groupId?: number;
  semester?: number;
  limit?: number;
}

interface IGrade
{
  id: number;
  grade: number;
  course: ICourseIdAndName;
}

export interface IGetCuratorData {
  id: number;
  user: IUserNoMail;
  grades: IGrade[];
  group: IGroup;
}

export interface IUseGetCurator {
  data: IPaginateData<IGetCuratorData> | null;
  getCurator: (params?: IGetCuratorParams) => void;
}

export const useGetCurator = (): IUseGetCurator => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetCuratorData> | null>(null);

  const getCurator = (params?: IGetCuratorParams) => {
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

  return { data, getCurator };
};

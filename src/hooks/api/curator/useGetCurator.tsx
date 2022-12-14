import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IPaginateData } from '../../../types';
import { ICourseIdAndName, IGroup, IUserNoMail } from '../interfaces';
import $api from '../config';

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
  const [data, setData] = useState<IPaginateData<IGetCuratorData> | null>(null);

  const getCurator = (params?: IGetCuratorParams) => {
    $api.get('/users/curator/page', {
      params: {
        orderBy: 'DESC',
        ...params,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGetCuratorData> | null>) => {
        setData(response.data);
      });
  };

  return { data, getCurator };
};

import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../../types';

import { IGroup } from '../../interfaces';
import $api from '../../config';

// eslint-disable-next-line max-len
type orderByColumn = 'id' | ' Groups' | 'startDate' | 'endDate' | 'requiredCourses' | 'notRequiredCourses' | 'created' | 'updated';
export interface IGetVotingsAdminParams {
  orderByColumn?:orderByColumn;
  orderBy?: OrderBy;
  search?: string;
  id?: number;
  name?: string;
  groups?:number;
  startDate?: string;
  endDate?: string;
  status?: string;
  requiredCourses?:number[];
  notRequiredCourses?:number[];
  page?: number;
  limit?: number;
}

export interface IGetVotingsAdminData {
  id: number;
  groups: IGroup[];
  startDate: string;
  endDate: string;
  tookPart: number;
  allStudents: number;
  status: string;
}

export interface IUseGetVotingsAdmin {
  data: IPaginateData<IGetVotingsAdminData> | null;
  getVotings: (params?: IGetVotingsAdminParams) => void;
}

export const useGetVotingsAdmin = (): IUseGetVotingsAdmin => {
  const [data, setData] = useState<IPaginateData<IGetVotingsAdminData> | null>(null);

  const getVotings = (params?: IGetVotingsAdminParams) => {
    $api.get('/voting', {
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetVotingsAdminData> | null>) => {
        setData(response.data);
      });
  };

  return { data, getVotings };
};

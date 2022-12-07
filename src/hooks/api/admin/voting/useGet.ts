import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { IGroup } from '../../interfaces';

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
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetVotingsAdminData> | null>(null);

  const getVotings = (params?: IGetVotingsAdminParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/voting`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetVotingsAdminData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getVotings };
};

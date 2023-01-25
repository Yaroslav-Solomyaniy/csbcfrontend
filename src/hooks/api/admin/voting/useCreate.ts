import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../../config';

export interface ICreateVotingParams {
  groups: number[];
  startDate: Date | string | null;
  endDate: Date | string | null;
  requiredCourses: number[];
  notRequiredCourses: number[];
}

export interface ICreateVotingData {
  id: number;
  startDate: string;
  endDate: string;
}

export interface IUseCreateVotingAdmin {
  data: ICreateVotingData | null;
  createVoting: (params: ICreateVotingParams) => void;
}

export const useCreateVotingAdmin = (): IUseCreateVotingAdmin => {
  const [data, setData] = useState<ICreateVotingData | null>(null);

  const createVoting = (params: ICreateVotingParams) => {
    $api.post('/voting', params)
      .then((response: AxiosResponse< ICreateVotingData | null>) => {
        setData(response.data);
      });
  };

  return { data, createVoting };
};

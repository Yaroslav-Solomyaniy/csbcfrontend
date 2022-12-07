import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

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
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<ICreateVotingData | null>(null);

  const createVoting = (params: ICreateVotingParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/voting`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse< ICreateVotingData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, createVoting };
};

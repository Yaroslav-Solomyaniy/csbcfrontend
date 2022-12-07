import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IGetVotingResultDataById } from './IGetVotingResultDataById';

interface IGetVotingResultByIdParams {
  id: number;
}

export interface IUseGetVotingResultById {
  data: IGetVotingResultDataById | null;
  getVotingResultById: (params: IGetVotingResultByIdParams) => void;
}

export const useGetVotingResultById = (): IUseGetVotingResultById => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetVotingResultDataById | null>(null);

  const getVotingResultById = (params: IGetVotingResultByIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/voting/${params.id}/result`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetVotingResultDataById | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getVotingResultById };
};

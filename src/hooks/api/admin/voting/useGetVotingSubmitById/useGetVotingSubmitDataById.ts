import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IGetVotingSubmitDataById } from './IGetVotingSubmitDataById';

interface IGetVotingSubmitDataByIdParams {
  id: number;
}

export interface IUseGetVotingSubmitDataById {
  data: IGetVotingSubmitDataById | null;
  getVotingSubmitDataById: (params: IGetVotingSubmitDataByIdParams) => void;
}

export const useGetVotingSubmitDataById = (): IUseGetVotingSubmitDataById => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetVotingSubmitDataById | null>(null);

  const getVotingSubmitDataById = (params: IGetVotingSubmitDataByIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/voting/${params.id}/submit-form`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetVotingSubmitDataById | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getVotingSubmitDataById };
};

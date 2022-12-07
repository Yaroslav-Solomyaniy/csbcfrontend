import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

export interface ISubmitVotingParams {
  courses: number[];
}

export interface ISubmitVotingData {
  message: string;
}

export interface IUseSubmitVoting {
  data: ISubmitVotingData | null;
  submitVoting: (params: ISubmitVotingParams, id: number) => void;
}

export const useSubmitVoting = (): IUseSubmitVoting => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<ISubmitVotingData | null>(null);

  const submitVoting = (params: ISubmitVotingParams, id: number) => {
    axios.post(`${process.env.REACT_APP_API_URL}/voting/${id}/courses/submit`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<ISubmitVotingData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, submitVoting };
};

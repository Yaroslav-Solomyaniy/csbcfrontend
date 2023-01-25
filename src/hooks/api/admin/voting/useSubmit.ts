import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../../config';

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
  const [data, setData] = useState<ISubmitVotingData | null>(null);

  const submitVoting = (params: ISubmitVotingParams, id: number) => {
    $api.post(`/voting/${id}/courses/submit`, params)
      .then((response: AxiosResponse<ISubmitVotingData | null>) => {
        setData(response.data);
      });
  };

  return { data, submitVoting };
};

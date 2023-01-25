import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IGetVotingResultDataById } from './IGetVotingResultDataById';
import $api from '../../../config';

interface IGetVotingResultByIdParams {
  id: number;
}

export interface IUseGetVotingResultById {
  data: IGetVotingResultDataById | null;
  getVotingResultById: (params: IGetVotingResultByIdParams) => void;
}

export const useGetVotingResultById = (): IUseGetVotingResultById => {
  const [data, setData] = useState<IGetVotingResultDataById | null>(null);

  const getVotingResultById = (params: IGetVotingResultByIdParams) => {
    $api.get(`/voting/${params.id}/result`)
      .then((response: AxiosResponse<IGetVotingResultDataById | null>) => {
        setData(response.data);
      });
  };

  return { data, getVotingResultById };
};

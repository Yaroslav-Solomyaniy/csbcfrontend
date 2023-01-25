import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IGetVotingSubmitDataById } from './IGetVotingSubmitDataById';
import $api from '../../../config';

interface IGetVotingSubmitDataByIdParams {
  id: number;
}

export interface IUseGetVotingSubmitDataById {
  data: IGetVotingSubmitDataById | null;
  getVotingSubmitDataById: (params: IGetVotingSubmitDataByIdParams) => void;
}

export const useGetVotingSubmitDataById = (): IUseGetVotingSubmitDataById => {
  const [data, setData] = useState<IGetVotingSubmitDataById | null>(null);

  const getVotingSubmitDataById = (params: IGetVotingSubmitDataByIdParams) => {
    $api.get(`/voting/${params.id}/submit-form`)
      .then((response: AxiosResponse<IGetVotingSubmitDataById | null>) => {
        setData(response.data);
      });
  };

  return { data, getVotingSubmitDataById };
};

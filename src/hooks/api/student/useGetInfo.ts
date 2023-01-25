import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../config';

export interface IGetStudentVotingInfo {
  startDate: string;
  endDate: string;
  isRevote: boolean;
}

export interface IUseGetStudentVotingInfo {
  votingInfo: IGetStudentVotingInfo | null;
  getStudentVotingInfo: () => void;
}

export const useGetStudentVotingInfo = (): IUseGetStudentVotingInfo => {
  const [votingInfo, setVotingInfo] = useState<IGetStudentVotingInfo | null>(null);

  const getStudentVotingInfo = () => {
    $api.get('/students/page/voting/info')
      .then((response: AxiosResponse<IGetStudentVotingInfo | null>) => {
        setVotingInfo(response.data);
      });
  };

  return { votingInfo, getStudentVotingInfo };
};

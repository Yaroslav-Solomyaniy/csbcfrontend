import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../context/All/AuthContext';

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
  const { user } = AuthContext();
  const [votingInfo, setVotingInfo] = useState<IGetStudentVotingInfo | null>(null);

  const getStudentVotingInfo = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/page/voting/info`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetStudentVotingInfo | null>) => {
        setVotingInfo(response.data);
      });
  };

  return { votingInfo, getStudentVotingInfo };
};

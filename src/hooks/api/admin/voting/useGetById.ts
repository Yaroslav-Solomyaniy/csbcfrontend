import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { IGroup } from '../../interfaces';

interface IGetVotingByIdParams {
  id: string;
}

interface ICourse{
  id: number;
  name: string;
}

interface IGetVotingByIdData {
  id: number;
  groups: IGroup[];
  startDate: Date | string | null;
  endDate: Date | string | null;
  requiredCourses: ICourse[];
  notRequiredCourses: ICourse[];
}

export interface IUseGetVotingById {
  data: IGetVotingByIdData | null;
  getVotingById: (params: IGetVotingByIdParams) => void;
}

export const useGetVotingById = (): IUseGetVotingById => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetVotingByIdData | null>(null);

  const getVotingById = (params: IGetVotingByIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/voting/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetVotingByIdData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getVotingById };
};

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

export interface IEditVotingParams {
  groups: number[];
  startDate: Date | string | null;
  endDate: Date | string | null;
  requiredCourses: number[];
  notRequiredCourses: number[];
  isRevote?:boolean;
}

export interface IUseEditVoting {
  data: FetchSuccess | null;
  editVoting: (params: IEditVotingParams, id: number) => void;
}

export const useEditVoting = (): IUseEditVoting => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editVoting = (params: IEditVotingParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/voting/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, editVoting };
};

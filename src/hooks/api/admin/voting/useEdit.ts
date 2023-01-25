import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import $api from '../../config';

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
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editVoting = (params: IEditVotingParams, id: number) => {
    $api.patch(`/voting/${id}`, params)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, editVoting };
};

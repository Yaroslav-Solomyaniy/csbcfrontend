import { useState } from 'react';
import { AxiosResponse } from 'axios';

import { IGroup } from '../../interfaces';
import $api from '../../config';

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
  const [data, setData] = useState<IGetVotingByIdData | null>(null);

  const getVotingById = (params: IGetVotingByIdParams) => {
    $api.get(`/voting/${params.id}`)
      .then((response: AxiosResponse<IGetVotingByIdData | null>) => {
        setData(response.data);
      });
  };

  return { data, getVotingById };
};

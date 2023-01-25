import { useState } from 'react';
import { AxiosResponse } from 'axios';

import { IGetGradesData } from './interfaces/IGetGradesData';
import $api from '../../config';

interface IGetGradesByIdParams {
  id: number;
}

export interface IUseGetGradesById {
  data: IGetGradesData | null;
  getGradesById: (params: IGetGradesByIdParams) => void;
}

export const useGetGradesById = (): IUseGetGradesById => {
  const [data, setData] = useState<IGetGradesData | null>(null);

  const getGradesById = (params: IGetGradesByIdParams) => {
    $api.get(`/grades/student/${params.id}`)
      .then((response: AxiosResponse<IGetGradesData | null>) => {
        setData(response.data);
      });
  };

  return { data, getGradesById };
};

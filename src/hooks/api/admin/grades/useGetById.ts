import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { IGetGradesData } from './interfaces/IGetGradesData';

interface IGetGradesByIdParams {
  id: number;
}

export interface IUseGetGradesById {
  data: IGetGradesData | null;
  getGradesById: (params: IGetGradesByIdParams) => void;
}

export const useGetGradesById = (): IUseGetGradesById => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetGradesData | null>(null);

  const getGradesById = (params: IGetGradesByIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades/student/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetGradesData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getGradesById };
};

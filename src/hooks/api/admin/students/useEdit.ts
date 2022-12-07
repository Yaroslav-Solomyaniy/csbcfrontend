import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';
import { ICreateStudentParams } from './interfaces/ICreateStudentParams';

export interface IUseEditStudent {
  data: FetchSuccess | null;
  editStudent: (params: ICreateStudentParams, id: number) => void;
}

export const useEditStudent = (): IUseEditStudent => {
  const { user } = AuthContext();
  const [data, setData] = useState<FetchSuccess | null>(null);
  const { addErrors } = MessagesContext();

  const editStudent = (params: ICreateStudentParams, id: number): void => {
    axios.patch(`${process.env.REACT_APP_API_URL}/students/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<FetchSuccess | null>) => {
      setData(response.data);
    })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, editStudent };
};

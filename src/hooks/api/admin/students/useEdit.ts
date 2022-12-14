import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';

import { ICreateStudentParams } from './interfaces/ICreateStudentParams';
import $api from '../../config';

export interface IUseEditStudent {
  data: FetchSuccess | null;
  editStudent: (params: ICreateStudentParams, id: number) => void;
}

export const useEditStudent = (): IUseEditStudent => {
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editStudent = (params: ICreateStudentParams, id: number): void => {
    $api.patch(`/students/${id}`, params)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, editStudent };
};

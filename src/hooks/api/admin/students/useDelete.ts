import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../../config';

export interface IUseDeleteStudent {
  data: string | null;
  deleteStudent: (id: number) => void;
}

export const useDeleteStudent = (): IUseDeleteStudent => {
  const [data, setData] = useState<string | null>(null);

  const deleteStudent = (id: number): void => {
    $api.delete(`/students/${id}`)
      .then((response:AxiosResponse<any>) => {
        setData(response.data);
      });
  };

  return { data, deleteStudent };
};

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

export interface IUseDeleteCourse {
  data: FetchSuccess | null;
  deleteCourse: (id: number) => void;
}

export const useDeleteCourse = (): IUseDeleteCourse => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const deleteCourse = (id: number) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/courses/${id}`, {
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

  return { data, deleteCourse };
};

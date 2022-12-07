import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';
import { FetchSuccess } from '../../../types';

export interface IUseDeleteUser {
  data: FetchSuccess | null;
  deleteUser: (id: number) => void;
}

export const useDeleteUser = (): IUseDeleteUser => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const deleteUser = (id: number) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`, {
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

  return { data, deleteUser };
};

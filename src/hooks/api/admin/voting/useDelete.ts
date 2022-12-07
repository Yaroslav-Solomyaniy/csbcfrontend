import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

export interface IUseDeleteVoting {
  data: FetchSuccess | null;
  deleteVoting: (id: number) => void;
}

export const useDeleteVoting = (): IUseDeleteVoting => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const deleteVoting = (id: number) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/voting/${id}`, {
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

  return { data, deleteVoting };
};

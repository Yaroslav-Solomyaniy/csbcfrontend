import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import { MessagesContext } from '../../../../context/All/Messages';
import { AuthContext } from '../../../../context/All/AuthContext';

export interface IUseDeleteGroup {
  data: FetchSuccess | null;
  deleteGroup: (id: number) => void;
}

export const useDeleteGroup = (): IUseDeleteGroup => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const deleteGroup = (id: number) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/groups/${id}`, {
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

  return { data, deleteGroup };
};

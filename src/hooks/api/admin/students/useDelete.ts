import { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

export interface IUseDeleteStudent {
  data: string | null;
  deleteStudent: (id: number) => void;
}

export const useDeleteStudent = (): IUseDeleteStudent => {
  const { user } = AuthContext();
  const [data, setData] = useState<string | null>(null);
  const { addErrors } = MessagesContext();

  const deleteStudent = (id: number): void => {
    axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, deleteStudent };
};

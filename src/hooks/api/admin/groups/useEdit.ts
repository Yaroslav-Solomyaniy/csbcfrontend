import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

export interface IEditGroupParams {
  name: string;
  curatorId: number;
  orderNumber: string;
}

export interface IUseEditGroup {
  data: FetchSuccess | null;
  editGroup: (params: IEditGroupParams, id: number) => void;
}

export const useEditGroup = (): IUseEditGroup => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editGroup = (params: IEditGroupParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/groups/${id}`, params, {
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

  return { data, editGroup };
};

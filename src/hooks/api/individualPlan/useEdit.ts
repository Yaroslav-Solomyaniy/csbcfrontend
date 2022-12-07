import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../types';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';

interface IEditPlanParams{
  courses: number[];
}

export interface IUseEditIndvPlan {
  data: FetchSuccess | null;
  editPlan: (params: IEditPlanParams, id: number) => void;
}

export const useEditIndvPlan = (): IUseEditIndvPlan => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editPlan = (params: IEditPlanParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/students/${id}/edit-individual-plan`, params, {
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

  return { data, editPlan };
};

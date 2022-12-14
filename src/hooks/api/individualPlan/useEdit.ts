import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../types';
import $api from '../config';

interface IEditPlanParams{
  courses: number[];
}

export interface IUseEditIndvPlan {
  data: FetchSuccess | null;
  editPlan: (params: IEditPlanParams, id: number) => void;
}

export const useEditIndvPlan = (): IUseEditIndvPlan => {
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editPlan = (params: IEditPlanParams, id: number) => {
    $api.patch(`/students/${id}/edit-individual-plan`, params)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, editPlan };
};

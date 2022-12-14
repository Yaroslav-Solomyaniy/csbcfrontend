import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IUser, IUserNoMail } from '../interfaces';
import $api from '../config';

export interface IGetInvPlanParams {
  id: number;
  semester?: number;
}

interface IGrade{
  id: number;
  grade: number;
  course: {
    id: number;
    name: string;
    credits: number;
    lectureHours: number;
    isActive: boolean;
    semester: number;
    type: string;
    isExam: true;
    teacher: IUser;
  };
}

export interface IGetInvPlanData {
  id: number;
  user: IUserNoMail;
  grades:IGrade[];
}

export interface IUseGetIndvPlan {
  data: IGetInvPlanData | null;
  getPlan: (params: IGetInvPlanParams) => void;
}

export const useGetIndvPlan = (): IUseGetIndvPlan => {
  const [data, setData] = useState<IGetInvPlanData | null>(null);

  const getPlan = (params: IGetInvPlanParams) => {
    $api.get(`/students/get-individual-plan/${params.id}`, {
      params: { semester: params.semester },
    })
      .then((response: AxiosResponse<IGetInvPlanData | null>) => {
        setData(response.data);
      });
  };

  return { data, getPlan };
};

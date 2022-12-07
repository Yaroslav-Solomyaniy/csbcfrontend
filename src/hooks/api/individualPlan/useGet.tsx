import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';
import { IUser, IUserNoMail } from '../interfaces';

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
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetInvPlanData | null>(null);

  const getPlan = (params: IGetInvPlanParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/get-individual-plan/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { semester: params.semester },
    })
      .then((response: AxiosResponse<IGetInvPlanData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getPlan };
};

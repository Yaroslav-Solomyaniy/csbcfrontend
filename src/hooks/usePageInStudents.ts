import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../types';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';

export interface IGetStudentVotingData {
  requiredCourses: {
    id: number;
    name: string;
    credits: number;
    lectureHours: number;
    isActive: boolean;
    semester: number;
    isCompulsory: boolean;
    isExam: boolean;
    teacher: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
      email:string;
    };
  }[];
  notRequiredCourses: {
    id: number;
    name: string;
    credits: number;
    lectureHours: number;
    isActive: boolean;
    semester: number;
    isCompulsory: boolean;
    isExam: boolean;
    teacher: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
      email:string;
    };
  }[];
}

export interface IUseStudentVotingGet{
  data: IGetStudentVotingData | null;
  getVotingStudent: () => void;
}

export const useStudentVotingGet = (): IUseStudentVotingGet => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IGetStudentVotingData | null>(null);

  const getVotingStudent = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/page/voting`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetStudentVotingData| null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getVotingStudent };
};

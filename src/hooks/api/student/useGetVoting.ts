import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IUser } from '../interfaces';
import { AuthContext } from '../../../context/All/AuthContext';

interface ICourse{
  id: number;
  name: string;
  credits: number;
  lectureHours: number;
  isActive: boolean;
  semester: number;
  isCompulsory: boolean;
  isExam: boolean;
  teacher: IUser;
}

export interface IGetStudentVotingData {
  isRevote: boolean;
  requiredCourses: ICourse[];
  notRequiredCourses: ICourse[];
  startDate: string;
  approveCourse: number[];
  endDate: string;
  studentVotes: number[][];
}

export interface IUseGetStudentVoting {
  data: IGetStudentVotingData | [] | null;
  getStudentVoting: () => void;
}

export const useGetStudentVoting = (): IUseGetStudentVoting => {
  const { user } = AuthContext();
  const [data, setData] = useState<IGetStudentVotingData | [] | null>(null);

  const getStudentVoting = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/page/voting`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetStudentVotingData | [] | null>) => {
        setData(response.data);
      });
  };

  return { data, getStudentVoting };
};

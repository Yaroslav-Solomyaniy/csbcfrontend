import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { IUser } from '../interfaces';
import $api from '../config';

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
  const [data, setData] = useState<IGetStudentVotingData | [] | null>(null);

  const getStudentVoting = () => {
    $api.get('/students/page/voting')
      .then((response: AxiosResponse<IGetStudentVotingData | [] | null>) => {
        setData(response.data);
      });
  };

  return { data, getStudentVoting };
};

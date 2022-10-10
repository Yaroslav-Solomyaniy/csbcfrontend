import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';

export interface IGetStudentVotingData {
  isRevote: boolean;
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
  startDate: string;
  approveCourse: [];
  endDate: string;
  studentVotes: [];
}

export interface IUseStudentVotingGet{
  data: IGetStudentVotingData | null;
  getVotingStudent: () => void;
}

export const useStudentVotingGet = (): IUseStudentVotingGet => {
  const { user } = AuthContext();
  const [data, setData] = useState<IGetStudentVotingData | null>(null);

  const getVotingStudent = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/page/voting`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetStudentVotingData| null>) => {
        setData(response.data);
      });
  };

  return { data, getVotingStudent };
};

export interface IVotingStudentPostParams {
  courses: number[];
}

interface IVotingStudentPostData {
 message:string;
}

export interface IUseStudentVotingCreate {
  data: IVotingStudentPostData | null;
  studentVotingCreate: (params: IVotingStudentPostParams) => void;
}

export const useStudentVotingCreate = (): IUseStudentVotingCreate => {
  const { addErrors, addInfo } = MessagesContext();
  const { user } = AuthContext();
  const [data, setData] = useState<IVotingStudentPostData | null>(null);

  const studentVotingCreate = (params: IVotingStudentPostParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/students/page/voting`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IVotingStudentPostData>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, studentVotingCreate };
};

export interface IVotingStudentRevoteParams {
  courses: number[];
}

interface IVotingStudentRevoteData {
  message:string;
}
export interface IUseVotingStudentRevote {
  data: IVotingStudentRevoteData | null;
  studentVotingRevote: (params: IVotingStudentRevoteParams) => void;
}

export const useVotingStudentRevote = (): IUseVotingStudentRevote => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [data, setData] = useState<IVotingStudentRevoteData | null>(null);

  const studentVotingRevote = (params: IVotingStudentRevoteParams) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/students/page/voting`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IVotingStudentRevoteData>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, studentVotingRevote };
};

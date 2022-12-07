import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { MessagesContext } from '../../../context/All/Messages';
import { AuthContext } from '../../../context/All/AuthContext';

export interface IVoteStudentParams {
  courses: number[];
}

interface IVoteStudentData {
  message:string;
}

export interface IUseVoteStudent {
  data: IVoteStudentData | null;
  studVote: (params: IVoteStudentParams) => void;
}

export const useVoteStudent = (): IUseVoteStudent => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [data, setData] = useState<IVoteStudentData | null>(null);

  const studVote = (params: IVoteStudentParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/students/page/voting`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IVoteStudentData>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, studVote };
};

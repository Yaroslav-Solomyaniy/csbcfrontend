import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../config';

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
  const [data, setData] = useState<IVoteStudentData | null>(null);

  const studVote = (params: IVoteStudentParams) => {
    $api.post('/students/page/voting', params)
      .then((response: AxiosResponse<IVoteStudentData>) => {
        setData(response.data);
      });
  };

  return { data, studVote };
};

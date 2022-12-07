import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { MessagesContext } from '../../../context/All/Messages';
import { AuthContext } from '../../../context/All/AuthContext';

export interface IRevoteStudentParams {
  courses: number[];
}

interface IRevoteStudentData {
  message:string;
}

export interface IUseRevoteStudent {
  data: IRevoteStudentData | null;
  studRevote: (params: IRevoteStudentParams) => void;
}

export const useRevoteStudent = (): IUseRevoteStudent => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [data, setData] = useState<IRevoteStudentData | null>(null);

  const studRevote = (params: IRevoteStudentParams) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/students/page/voting`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IRevoteStudentData>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, studRevote };
};

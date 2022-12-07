import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../types';
import { AuthContext } from '../../../context/All/AuthContext';
import { MessagesContext } from '../../../context/All/Messages';

export interface IEditTeacherByIdParams {
  courseId: number;
  grade: number;
  reasonForChange: string;
}

export interface IUseEditTeacherGrade {
  data: FetchSuccess | null;
  editTeacherGrade: (params: IEditTeacherByIdParams, id: number) => void;
}

export const useEditTeacherGrade = (): IUseEditTeacherGrade => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editTeacherGrade = (params: IEditTeacherByIdParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/users/teacher/page/student/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, editTeacherGrade };
};

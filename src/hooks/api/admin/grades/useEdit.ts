import { useState } from 'react';
import axios from 'axios';
import { FetchSuccess } from '../../../../types';
import { AuthContext } from '../../../../context/All/AuthContext';
import { MessagesContext } from '../../../../context/All/Messages';

export interface IEditGradeParams {
  courseId: number;
  grade: number;
  reasonForChange: string;
}

export interface IUseEditGrade {
  data: FetchSuccess | null;
  editGrade: (params: IEditGradeParams, id: number) => void;
}

export const useEditGrade = (): IUseEditGrade => {
  const { user } = AuthContext();
  const { addErrors, addInfo } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editGrade = (params: IEditGradeParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/grades/student/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then(() => {
        setData({ success: true });
        addInfo('Оцінку успішно відредаговано.');
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, editGrade };
};

import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../types';
import $api from '../config';

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
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editTeacherGrade = (params: IEditTeacherByIdParams, id: number) => {
    $api.patch(`/users/teacher/page/student/${id}`, params)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, editTeacherGrade };
};

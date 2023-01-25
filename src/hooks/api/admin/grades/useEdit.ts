import { useState } from 'react';
import { FetchSuccess } from '../../../../types';
import { MessagesContext } from '../../../../context/All/Messages';
import $api from '../../config';

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
  const { addInfo } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editGrade = (params: IEditGradeParams, id: number) => {
    $api.patch(`/grades/student/${id}`, params)
      .then(() => {
        setData({ success: true });
        addInfo('Оцінку успішно відредаговано.');
      });
  };

  return { data, editGrade };
};

import { useState } from 'react';
import { AxiosResponse } from 'axios';
import $api from '../config';

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
  const [data, setData] = useState<IRevoteStudentData | null>(null);

  const studRevote = (params: IRevoteStudentParams) => {
    $api.patch('/students/page/voting', params)
      .then((response: AxiosResponse<IRevoteStudentData>) => {
        setData(response.data);
      });
  };

  return { data, studRevote };
};

import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import { ICoursesParams } from '../../interfaces';
import $api from '../../config';

export interface IUseEditCourse {
  data: FetchSuccess | null;
  editCourse: (params: ICoursesParams, id: number) => void;
}

export const useEditCourse = (): IUseEditCourse => {
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editCourse = (params: ICoursesParams, id: number) => {
    $api.patch(`/courses/${id}`, params)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, editCourse };
};

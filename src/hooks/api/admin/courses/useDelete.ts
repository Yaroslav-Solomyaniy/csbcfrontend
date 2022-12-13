import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';

import $api from '../../config';

export interface IUseDeleteCourse {
  data: FetchSuccess | null;
  deleteCourse: (id: number) => void;
}

export const useDeleteCourse = (): IUseDeleteCourse => {
  const [data, setData] = useState<FetchSuccess | null>(null);

  const deleteCourse = (id: number) => {
    $api.delete(`/courses/${id}`)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, deleteCourse };
};

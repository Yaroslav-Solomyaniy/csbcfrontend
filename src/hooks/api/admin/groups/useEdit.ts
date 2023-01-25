import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { FetchSuccess } from '../../../../types';
import $api from '../../config';

export interface IEditGroupParams {
  name: string;
  curatorId: number;
  orderNumber: string;
}

export interface IUseEditGroup {
  data: FetchSuccess | null;
  editGroup: (params: IEditGroupParams, id: number) => void;
}

export const useEditGroup = (): IUseEditGroup => {
  const [data, setData] = useState<FetchSuccess | null>(null);

  const editGroup = (params: IEditGroupParams, id: number) => {
    $api.patch(`/groups/${id}`, params)
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
      });
  };

  return { data, editGroup };
};

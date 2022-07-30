import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess, IPaginateData, OrderBy } from '../types';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';

export interface IGetCuratorParams {
  group?: string;
  curatorId?: number;
  orderBy?: OrderBy;
  page?: number;
  limit?: number;
}

export interface IGetCuratorData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  groups: {
    name: string;
  }[];
}

export interface IUseCuratorsGet {
  data: IPaginateData<IGetCuratorData> | null;
  getCurators: (params?: IGetCuratorParams) => void;
}

export const useCuratorsGet = (): IUseCuratorsGet => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IPaginateData<IGetCuratorData> | null>(null);

  const getCurators = (params?: IGetCuratorParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/curator/groups`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetCuratorData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getCurators };
};

export interface ICuratorCreateParams {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface ICuratorCreateData {
  id: number;
  name: string;
  role: string;
}

export interface IUseCuratorCreate {
  data: ICuratorCreateData | null;
  createCurator: (params: ICuratorCreateParams) => void;
}

export const useCuratorCreate = (): IUseCuratorCreate => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<ICuratorCreateData | null>(null);

  const createCurator = (params: ICuratorCreateParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<ICuratorCreateData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.message);
      });
  };

  return { data, createCurator };
};

interface IGetCuratorIdParams {
  id: string;
}

interface IGetCuratorIdData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface IUseGetCuratorId {
  data: IGetCuratorIdData | null;
  getCuratorId: (params: IGetCuratorIdParams) => void;
}

export const useGetCuratorId = (): IUseGetCuratorId => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IGetCuratorIdData | null>(null);

  const getCuratorId = (params: IGetCuratorIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetCuratorIdData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getCuratorId };
};

export interface ICuratorEditParams {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface IUseCuratorEdit {
  data: FetchSuccess | null;
  curatorEdit: (params: ICuratorEditParams, id: number) => void;
}

export const useCuratorEdit = (): IUseCuratorEdit => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const curatorEdit = (params: ICuratorEditParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/users/${id}`, params, {
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

  return { data, curatorEdit };
};

export interface IUseCuratorDelete {
  data: FetchSuccess | null;
  curatorDelete: (id: number) => void;
}

export const useCuratorDelete = (): IUseCuratorDelete => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const curatorDelete = (id: number) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`, {
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

  return { data, curatorDelete };
};

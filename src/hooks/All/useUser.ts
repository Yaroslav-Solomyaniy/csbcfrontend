import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';
import { FetchSuccess, IPaginateData, OrderBy } from '../../types';

export interface IGetUserParams {
  orderByColumn?: 'id' | ' firstName' | 'lastName' | 'email' | 'updated' | 'created' | 'role';
  orderBy?: OrderBy;
  search?: string;
  id?: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export interface IGetUserData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
}

export interface IUseUserGet {
  data: IPaginateData<IGetUserData> | null;
  getUser: (params?: IGetUserParams) => void;
}

export const useUserGet = (): IUseUserGet => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetUserData> | null>(null);

  const getUser = (params?: IGetUserParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetUserData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getUser };
};

export interface IUserCreateParams {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface IUserCreateData {
  id: number;
  name: string;
  role: string;
}

export interface IUseUserCreate {
  data: IUserCreateData | null;
  createUser: (params: IUserCreateParams) => void;
}

export const useUserCreate = (): IUseUserCreate => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IUserCreateData | null>(null);

  const createUser = (params: IUserCreateParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IUserCreateData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, createUser };
};

interface IGetUserIdParams {
  id: string;
}

interface IGetUserIdData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface IUseUserGetId {
  data: IGetUserIdData | null;
  getUserId: (params: IGetUserIdParams) => void;
}

export const useUserGetId = (): IUseUserGetId => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetUserIdData | null>(null);

  const getUserId = (params: IGetUserIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetUserIdData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getUserId };
};

export interface IUserEditParams {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface IUseUserEdit {
  data: FetchSuccess | null;
  userEdit: (params: IUserEditParams, id: number) => void;
}

export const useUserEdit = (): IUseUserEdit => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const userEdit = (params: IUserEditParams, id: number) => {
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

  return { data, userEdit };
};

export interface IUseUserDelete {
  data: FetchSuccess | null;
  userDelete: (id: number) => void;
}

export const useUserDelete = (): IUseUserDelete => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const userDelete = (id: number) => {
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

  return { data, userDelete };
};

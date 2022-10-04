import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';
import { FetchSuccess, IPaginateData, OrderBy } from '../../types';

interface IGroupCurator {
  'id': number;
  'firstName': string;
  'lastName': string;
  'patronymic': string;
  'email': string;
  'role': string;
  'updated': string;
  'created': string;
}

interface IGroup {
  'id': number;
  'name': string;
  'curator': IGroupCurator;
  'orderNumber': string;
  'updated': string;
  'created': string;
}

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
  updated: string;
  created: string;
}

export interface IStudentData {
  id: number;
  dateOfBirth: string;
  group: IGroup;
  user: IUser;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean;
}

export interface IGetParams {
  orderByColumn?:
    | 'id'
    | 'dateOfBirth'
    | 'groupId'
    | 'studentId'
    | 'orderNumber'
    | 'edeboId'
    | 'isFullTime'
    | 'updated'
    |'created';
    id?:number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  orderBy?: OrderBy;
  search?: string;
  group?: number;
  orderNumber?: string;
  edeboId?: string;
  isFullTime?: boolean | null;
  page?: number;
  limit?: number;
}

export interface IUseGetStudents {
  data: IPaginateData<IStudentData>| null;
  getStudents: (params: IGetParams) => void;
}

export const useGetStudents = (): IUseGetStudents => {
  const { user } = AuthContext();
  const [data, setData] = useState<IPaginateData<IStudentData> | null>(null);
  const { addErrors } = MessagesContext();

  const getStudents = (params: IGetParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        orderByColumn: 'created',
        orderBy: 'DESC',
        ...params,
      },
    }).then((response: AxiosResponse<IPaginateData<IStudentData>| null>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, getStudents };
};

export interface IStudentCreateParams {
  dateOfBirth: string | Date | null;
  groupId: number;
  user: IStudentCreateUser;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean | string | undefined;
}

interface IStudentCreateUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

interface IStudentCreateData {
  id: number;
}

export interface IUseStudentCreate {
  data: IStudentCreateData | null;
  studentCreate: (params: IStudentCreateParams) => void;
}

export const useStudentCreate = (): IUseStudentCreate => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IStudentCreateData | null>(null);

  const studentCreate = (params: IStudentCreateParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/students`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<IStudentCreateData>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, studentCreate };
};

interface IGetStudentIdParams {
  id: string;
}

export interface IUseGetStudentId {
  data: IStudentData | null;
  getStudentId: (params: IGetStudentIdParams) => void;
}

export const useStudentGetId = (): IUseGetStudentId => {
  const { user } = AuthContext();
  const [data, setData] = useState<IStudentData | null>(null);
  const { addErrors } = MessagesContext();

  const getStudentId = (params: IGetStudentIdParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<IStudentData>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, getStudentId };
};

export interface IUseStudentEdit {
  data: FetchSuccess | null;
  studentEdit: (params: IStudentCreateParams, id: number) => void;
}

export const useStudentEdit = (): IUseStudentEdit => {
  const { user } = AuthContext();
  const [data, setData] = useState<FetchSuccess | null>(null);
  const { addErrors } = MessagesContext();

  const studentEdit = (params: IStudentCreateParams, id: number): void => {
    axios.patch(`${process.env.REACT_APP_API_URL}/students/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<FetchSuccess | null>) => {
      setData(response.data);
    })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, studentEdit };
};

export interface IUseStudentDelete {
  data: string | null;
  studentDelete: (id: number) => void;
}

export const useStudentDelete = (): IUseStudentDelete => {
  const { user } = AuthContext();
  const [data, setData] = useState<string | null>(null);
  const { addErrors } = MessagesContext();

  const studentDelete = (id: number): void => {
    axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, studentDelete };
};
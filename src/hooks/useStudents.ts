import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';
import { FetchSuccess, IPaginateData } from '../types';

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
    | 'isFullTime';
  id?:number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  orderBy?: string;
  search?: string;
  group?: string;
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
  const { user } = useAuthContext();
  const [data, setData] = useState<IPaginateData<IStudentData> | null>(null);
  const { addErrors } = useMessagesContext();

  const getStudents = (params: IGetParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        orderByColumn: 'updated',
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
  dateOfBirth:string;
  groupId: number;
  user: IStudentCreateUser;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean | undefined;
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
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
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
  const { user } = useAuthContext();
  const [data, setData] = useState<IStudentData | null>(null);
  const { addErrors } = useMessagesContext();

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
  const { user } = useAuthContext();
  const [data, setData] = useState<FetchSuccess | null>(null);
  const { addErrors } = useMessagesContext();

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
  const { user } = useAuthContext();
  const [data, setData] = useState<string | null>(null);
  const { addErrors } = useMessagesContext();

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

import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';

interface IDataStudentsMeta {
  'totalItems': number;
  'itemCount': number;
  'itemsPerPage': number;
  'totalPages': number;
  'currentPage': number;
}

interface IDataStudentsLinks {
  'first': string;
  'previous': string;
  'next': string;
  'last': string;
}

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

export interface IDataStudentsItems {
  id: number;
  dateOfBirth: string;
  group: IGroup;
  user: IUser;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean;
}

interface IDataStudents {
  meta: IDataStudentsMeta;
  links: IDataStudentsLinks;
  items: IDataStudentsItems[];
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
  data: IDataStudents | null;
  getStudent: (params: IGetParams) => void;
}

export const useStudentsGet = (): IUseGetStudents => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IDataStudents | null>(null);
  const { addErrors } = useMessagesContext();

  const getStudent = (params: IGetParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        // orderByColumn: 'updated',
        orderBy: 'DESC',
        ...params,
      },
    }).then((respons: AxiosResponse<IDataStudents>) => {
      setData(respons.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, getStudent };
};

interface IAddStudentsUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

export interface IStudents {
  dateOfBirth: string;
  groupId: number;
  user: IAddStudentsUser;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean | undefined;
}

interface ICreateStudentsData {
  id: number;
}

export interface ICreateStudents {
  data: ICreateStudentsData | null;
  addStudent: (params: IStudents) => void;
}

export const useStudentCreate = (): ICreateStudents => {
  const { user } = useAuthContext();
  const { addErrors, addInfo } = useMessagesContext();
  const [data, setData] = useState<ICreateStudentsData | null>(null);

  const addStudent = (params: IStudents) => {
    axios.post(`${process.env.REACT_APP_API_URL}/students`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<ICreateStudentsData>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, addStudent };
};

interface IGetStudentsItemParams {
  id: string;
}

export interface IUseGetStudentsItem {
  data: IDataStudentsItems | null;
  getStudent: (params: IGetStudentsItemParams) => void;
}

export const useStudentGetId = (): IUseGetStudentsItem => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IDataStudentsItems | null>(null);
  const { addErrors } = useMessagesContext();

  const getStudent = (params: IGetStudentsItemParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        params: `${params}`,
      },
    }).then((respons: AxiosResponse<IDataStudentsItems>) => {
      setData(respons.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, getStudent };
};

interface IDataPatchStudentsItem {
  message: string;
}

export interface IUsePatchStudentsItem {
  data: IDataPatchStudentsItem | null;
  patchStudent: (params: IStudents, id: number) => void;
}

export const useStudentPatch = (): IUsePatchStudentsItem => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IDataPatchStudentsItem | null>(null);
  const { addErrors } = useMessagesContext();

  const patchStudent = (params: IStudents, id: number): void => {
    axios.patch(`${process.env.REACT_APP_API_URL}/students/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        params: `{ id: ${id} }`,
      },
    }).then((e) => {
      setData(e.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, patchStudent };
};

export interface IUseDeleteStudentsItem {
  data: string | null;
  deleteStudent: (id: number, name: string) => void;
}

export const useStudentDelete = (): IUseDeleteStudentsItem => {
  const { user } = useAuthContext();
  const [data, setData] = useState<string | null>(null);
  const { addErrors, addInfo } = useMessagesContext();

  const deleteStudent = (id: number, name: string): void => {
    axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        id,
      },
    }).then((respons) => {
      addInfo(`Студента ${name} успішно видалено`);
      setData(respons.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, deleteStudent };
};

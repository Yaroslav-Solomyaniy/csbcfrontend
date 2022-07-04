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
  id: 0;
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

export interface IUseGetStudents {
  dataStudents: IDataStudents | null;
  getStudent: (params: IGetParams) => void;
}

interface IGetParams {
  orderByColumn?: 'id' | 'dateOfBirth' | 'groupId' | 'studentId' | 'orderNumber' | 'edeboId' | 'isFullTime';
  orderBy?: string;
  search?: string;
  group?: string;
  orderNumber?: string;
  edeboId?: string;
  isFullTime?: boolean;
  page?: number;
  limit?: number;

}

export const useStudentsGet = (): IUseGetStudents => {
  const { user } = useAuthContext();
  const [dataStudents, setDataStudents] = useState<IDataStudents | null>(null);
  const { addErrors } = useMessagesContext();

  const getStudent = (params: IGetParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        params: `${params}`,
      },
    }).then((respons: AxiosResponse<IDataStudents>) => {
      setDataStudents(respons.data);
    }).catch((error) => {
      addErrors(error.message);
    });
  };

  return { dataStudents, getStudent };
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
  isFullTime: boolean;
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
      addInfo('Студента успішно додано');
      setData(response.data);
    }).catch((error) => {
      addErrors(error.message);
    });
  };

  return { data, addStudent };
};

interface IDataStudentsItem {
  id: number;
  dateOfBirth: string;
  group: {
    id: number;
    name: string;
    curator: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
      email: string;
    };
    orderNumber: string;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
  };
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean;
}

interface IGetStudentsItemParams {
  id: string;
}

export interface IUseGetStudentsItem {
  data: IDataStudentsItem | null;
  getStudent: (params: IGetStudentsItemParams) => void;
}

export const useStudentGetId = (): IUseGetStudentsItem => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IDataStudentsItem | null>(null);
  const { addErrors } = useMessagesContext();

  const getStudent = (params: IGetStudentsItemParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        params: `${params}`,
      },
    }).then((respons: AxiosResponse<IDataStudentsItem>) => {
      setData(respons.data);
    }).catch((error) => {
      addErrors(error.message);
    });
  };

  return { data, getStudent };
};

// interface IGetStudentsItemParams {
//   dateOfBirth: string;
//   groupId: number;
//   user: {
//     firstName: string;
//     lastName: string;
//     patronymic: string;
//     email: string;
//     role: string;
//   };
//   orderNumber: string;
//   edeboId: string;
//   isFullTime: boolean;
// }

interface IDataStudentsItem {
  message: string;
}

export interface IUsePatchStudentsItem {
  data: IDataStudentsItem | null;
  patchStudent: (params: IStudents, id: number) => void;
}

export const useStudentPatch = (): IUsePatchStudentsItem => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IDataStudentsItem | null>(null);
  const { addErrors } = useMessagesContext();

  const patchStudent = (params: IStudents, id: number): void => {
    axios.patch(`${process.env.REACT_APP_API_URL}/students/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        params: `{ id: ${id} }`,
      },
    }).then((respons: AxiosResponse<IDataStudentsItem>) => {
      setData(respons.data);
    }).catch((error) => {
      addErrors(error.message);
    });
  };

  return { data, patchStudent };
};

export interface IUseDeleteStudentsItem {
  data: string | null;
  patchStudent: (id: number) => void;
}

export const useStudentDelete = (): IUseDeleteStudentsItem => {
  const { user } = useAuthContext();
  const [data, setData] = useState<string | null>(null);
  const { addErrors } = useMessagesContext();

  const patchStudent = (id: number): void => {
    axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        params: `{ id: ${id} }`,
      },
    }).then((respons: AxiosResponse<any>) => {
      setData(respons.data);
    }).catch((error) => {
      addErrors(error.message);
    });
  };

  return { data, patchStudent };
};

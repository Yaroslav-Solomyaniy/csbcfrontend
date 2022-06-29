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

interface IDataStudentsItems {
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

interface IUseGetStudents {
  dataStudents: IDataStudents | null;
  getStudent: (params: IGetParams) => void;
}

interface IGetParams {
  orderByColumn: 'id' | 'dateOfBirth' | 'groupId' | 'studentId' | 'orderNumber' | 'edeboId' | 'isFullTime';
  orderBy: string;
  search: string;
  group: string;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean;
  page: number;
  limit: number;

}

export const useGetStudents = (): IUseGetStudents => {
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

export interface IAddStudents {
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

interface ICreateStudents {
  data: ICreateStudentsData | null;
  addStudent: (params: IAddStudents) => void;
}

export const useCreateStudents = (): ICreateStudents => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<ICreateStudentsData | null>(null);

  const addStudent = (params: IAddStudents) => {
    axios.post(`${process.env.REACT_APP_API_URL}/students`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<ICreateStudentsData>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.message);
    });
  };

  return { data, addStudent };
};

interface IDataID {
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

interface IGetIDParams {
  id: string;
}

interface IUseGetID {
  data: IDataID | null;
  getStudent: (params: IGetIDParams) => void;
}

export const useGetID = (): IUseGetID => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IDataID | null>(null);
  const { addErrors } = useMessagesContext();

  const getStudent = (params: IGetIDParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/students`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        params: `${params}`,
      },
    }).then((respons: AxiosResponse<IDataID>) => {
      setData(respons.data);
    }).catch((error) => {
      addErrors(error.message);
    });
  };

  return { data, getStudent };
};

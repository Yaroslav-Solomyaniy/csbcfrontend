import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess, IPaginateData, OrderBy } from '../../types';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';

export interface ICoursesParams {
  name: string;
  credits: number | null;
  lectureHours: number | null;
  isActive: boolean;
  semester: number;
  type: string;
  isExam: boolean;
  teacher: number;
  groups: number [];
}

export interface IGetCoursesParams {
  orderByColumn?:
    | 'id'
    | 'Name'
    | 'credits'
    | 'lectureHours'
    | 'isActive'
    | 'semester'
    | 'isCompulsory'
    | 'teacher'
    | 'groups'
    | 'created'
    |'updated';
  orderBy?: OrderBy;
  id?: number;
  search?: string;
  name?: string;
  credits?: number;
  lectureHours?: number;
  isExam?: boolean;
  isActive?: boolean;
  semester?: number;
  type?: string;
  teacher?: number;
  groups?: number;
  page?: number;
  limit?: number;
}

export interface IGetCoursesData {
  id: number;
  name: string;
  credits: number;
  lectureHours: number;
  isActive: boolean;
  semester: number;
  isExam: boolean;
  type: 'Загальна компетентність'
    | 'Фахова компетентність'
    | 'Вибіркова загальна компетентність'
    | 'Вибіркова фахова компетентність';
  teacher: {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
  };
  groups: {
    id: number;
    name: string;
    orderNumber: string;
  }[];
}

export interface IUseCoursesGet {
  data: IPaginateData<IGetCoursesData> | null;
  getCourses: (params?: IGetCoursesParams) => void;
}

export const useCoursesGet = (): IUseCoursesGet => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetCoursesData> | null>(null);

  const getCourses = (params?: IGetCoursesParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetCoursesData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getCourses };
};

// Create Course

export interface ICoursesCreateData {
  id: string;
}

export interface IUseCoursesCreate {
  data: ICoursesCreateData | null;
  createCourse: (params: ICoursesParams) => void;
}

export const useCreateCourse = (): IUseCoursesCreate => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<ICoursesCreateData | null>(null);

  const createCourse = (params: ICoursesParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/courses`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<ICoursesCreateData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.message);
      });
  };

  return { data, createCourse };
};

// get course by id

interface IGetCourseIdParams {
  id: string;
}

interface IGetCourseIdData {
  name: string;
  credits: number | string;
  lectureHours: number | string;
  isActive: boolean;
  semester: number;
  type: string;
  isExam: string;
  teacher: {
    'id': number;
    'firstName': string;
    'lastName': string;
    'patronymic': string;
    'email': string;
  } | null;
  groups:
    {
      'id': number;
      'name': string;
      'orderNumber': string;
    }[];
}

export interface IUseGetCourseId {
  data: IGetCourseIdData | null;
  getCourseId: (params: IGetCourseIdParams) => void;
}

export const useCourseGetId = (): IUseGetCourseId => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetCourseIdData | null>(null);

  const getCourseId = (params: IGetCourseIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetCourseIdData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getCourseId };
};

export interface IUseCourseEdit {
  data: FetchSuccess | null;
  courseEdit: (params: ICoursesParams, id: number) => void;
}

export const useCourseEdit = (): IUseCourseEdit => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const courseEdit = (params: ICoursesParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/courses/${id}`, params, {
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

  return { data, courseEdit };
};

export interface IUseCourseDelete {
  data: FetchSuccess | null;
  courseDelete: (id: number) => void;
}

export const useCourseDelete = (): IUseCourseDelete => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const courseDelete = (id: number) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/courses/${id}`, {
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

  return { data, courseDelete };
};

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../../types';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';

// GET LIST GROUPS

interface IGetListGroupsParams {
  orderByColumn?: 'id' | 'Name' | 'curator_id' | 'order_number' | 'deleted_order_number' | 'created' | 'updated';
  orderBy?: OrderBy;
  curatorName?: string;
  teacherId?: number;
  curatorId?: number;
}
interface IGetListGroupsData {
  id: number;
  name: string;
}
export interface IUseGetListGroups {
  optionsGroups: IGetListGroupsData[] | null;
  getListGroups: (params?: IGetListGroupsParams) => void;
}
export const useGetListGroups = (): IUseGetListGroups => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [optionsGroups, setOptionsGroups] = useState<IGetListGroupsData[] | null>(null);

  const getListGroups = (params?: IGetListGroupsParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups/dropdown/name`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { OrderByColumn: 'Name', ...params },
    })
      .then((response: AxiosResponse<IGetListGroupsData[] | null>) => {
        setOptionsGroups(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { optionsGroups, getListGroups };
};

// GET LIST CURATORS

interface IGetListCuratorsParams {
  orderByColumn?: 'id' | 'Name' | 'curator_id' | 'order_number' | 'deleted_order_number' | 'created' | 'updated';
  orderBy?: OrderBy;
  curatorName?: string;
}
interface IGetListCuratorsData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}
interface IUseGetListCurators {
  optionCurators: IGetListCuratorsData[] | null;
  getListCurators: (params?: IGetListCuratorsParams) => void;
}
export const useGetListCurators = (): IUseGetListCurators => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [optionCurators, setOptionCurators] = useState<IGetListCuratorsData[] | null>(null);

  const getListCurators = (params?: IGetListCuratorsParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups/dropdown/curators/`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { OrderByColumn: 'Name', ...params },
    })
      .then((response: AxiosResponse<IGetListCuratorsData[] | null>) => {
        setOptionCurators(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { optionCurators, getListCurators };
};

// GET LIST COURSES
interface IGetListCoursesParams {
  orderByColumn?: 'id'
    | 'name'
    | 'credits'
    | 'lectureHours'
    | 'isActive'
    | 'semester'
    | 'isCompulsory'
    | 'teacher'
    | 'groups'
    | 'created'
    | 'updated';
  orderBy?: OrderBy;
  type?: string;
  courseName?: string | number;
  teacherId?: number;
  curatorId?: number;
  semester?: number;
}
export interface IGetListCoursesData {
  id: number;
  name: string;
  credits: number;
  lectureHours: number;
  isActive: boolean;
  semester: number;
  type: string;
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
    curator: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
      email: string;
    };
    orderNumber: string;
    students: number;
  }[];
}
interface IUseGetListCourses {
  optionCourses:IGetListCoursesData[] | null;
  getListCourses: (params?: IGetListCoursesParams) => void;
}
export const useGetListCourses = (): IUseGetListCourses => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [optionCourses, setOptionCourses] = useState<IGetListCoursesData[] | null>(null);

  const getListCourses = (params?: IGetListCoursesParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses/name`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { OrderByColumn: 'name', ...params },
    })
      .then((response: AxiosResponse<IGetListCoursesData[] | null>) => {
        setOptionCourses(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { optionCourses, getListCourses };
};

// GET LIST TEACHER

interface IGetListTeachersParams {
  orderByColumn?: 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'created' | 'updated';
  orderBy?: OrderBy;
  teacherName?: string;
}
interface IGetListTeachersData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}
interface IUseGetListTeachers {
  listTeachers: IGetListTeachersData[] | null;
  getListTeachers: (params?: IGetListTeachersParams) => void;
}
export const useGetListTeachers = (): IUseGetListTeachers => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [listTeachers, setListTeachers] = useState<IGetListTeachersData[] | null>(null);
  const getListTeachers = (params?: IGetListTeachersParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/dropdown/teacher`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { OrderByColumn: 'lastName', ...params },
    })
      .then((response: AxiosResponse<IGetListTeachersData[] | null>) => {
        setListTeachers(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { listTeachers, getListTeachers };
};

// GET LIST STUDENT

interface IGetListStudentParams {
  orderByColumn?:
    'id'
    | 'dateOfBirth'
    | 'groupId'
    | 'studentId'
    | 'orderNumber'
    | 'edeboId'
    | 'isFullTime'
    | 'updated'
    | 'created';
  orderBy?: OrderBy;
  teacherName?: string;
  teacherId?: number;
  curatorId?: number;
}
interface IGetListStudentsData {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
  };
}
interface IUseGetListStudents {
  listStudents: IGetListStudentsData[] | null;
  getListStudents: (params?: IGetListStudentParams) => void;
}
export const useGetListStudents = (): IUseGetListStudents => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [listStudents, setListStudents] = useState<IGetListStudentsData[] | null>(null);

  const getListStudents = (params?: IGetListStudentParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/dropdown/name`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'id', ...params },
    })
      .then((response: AxiosResponse<IGetListStudentsData[] | null>) => {
        setListStudents(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { listStudents, getListStudents };
};

interface IGetListAdministratorsParams {
  orderByColumn?: 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'created' | 'updated';
  orderBy?: OrderBy;
}
interface IGetListAdministratorsData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}
interface IUseGetListAdministrators {
  listAdmins: IGetListAdministratorsData[] | null;
  getListAdministrators: (params?: IGetListAdministratorsParams) => void;
}

export const useGetListAdministrators = (): IUseGetListAdministrators => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [listAdmins, setListAdmins] = useState<IGetListAdministratorsData[] | null>(null);

  const getListAdministrators = (params?: IGetListAdministratorsParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/dropdown/admin`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'lastName', ...params },
    })
      .then((response: AxiosResponse<IGetListAdministratorsData[] | null>) => {
        setListAdmins(response.data);
      })
      .catch((error) => {
        addErrors(error.message);
      });
  };

  return { listAdmins, getListAdministrators };
};

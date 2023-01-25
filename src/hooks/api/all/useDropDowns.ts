import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { OrderBy } from '../../../types';
import { IUser, IUserNoMail } from '../interfaces';
import $api from '../config';

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
  const [optionsGroups, setOptionsGroups] = useState<IGetListGroupsData[] | null>(null);

  const getListGroups = (params?: IGetListGroupsParams) => {
    $api.get('/groups/dropdown/name', {
      params: { OrderByColumn: 'Name', ...params },
    })
      .then((response: AxiosResponse<IGetListGroupsData[] | null>) => {
        setOptionsGroups(response.data);
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
  const [optionCurators, setOptionCurators] = useState<IGetListCuratorsData[] | null>(null);

  const getListCurators = (params?: IGetListCuratorsParams) => {
    $api.get('/groups/dropdown/curators/', {
      params: { OrderByColumn: 'Name', ...params },
    })
      .then((response: AxiosResponse<IGetListCuratorsData[] | null>) => {
        setOptionCurators(response.data);
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
interface IGroup{
  id: number;
  name: string;
  curator: IUser;
  orderNumber: string;
  students: number;
}
export interface IGetListCoursesData {
  id: number;
  name: string;
  credits: number;
  lectureHours: number;
  isActive: boolean;
  semester: number;
  type: string;
  teacher: IUser;
  groups: IGroup[];
}
interface IUseGetListCourses {
  optionCourses:IGetListCoursesData[] | null;
  getListCourses: (params?: IGetListCoursesParams) => void;
}
export const useGetListCourses = (): IUseGetListCourses => {
  const [optionCourses, setOptionCourses] = useState<IGetListCoursesData[] | null>(null);

  const getListCourses = (params?: IGetListCoursesParams) => {
    $api.get('/courses/name', {
      params: { OrderByColumn: 'name', ...params },
    })
      .then((response: AxiosResponse<IGetListCoursesData[] | null>) => {
        setOptionCourses(response.data);
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
  const [listTeachers, setListTeachers] = useState<IGetListTeachersData[] | null>(null);
  const getListTeachers = (params?: IGetListTeachersParams) => {
    $api.get('/users/dropdown/teacher', {
      params: { OrderByColumn: 'lastName', ...params },
    })
      .then((response: AxiosResponse<IGetListTeachersData[] | null>) => {
        setListTeachers(response.data);
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
  user: IUserNoMail;
}
interface IUseGetListStudents {
  listStudents: IGetListStudentsData[] | null;
  getListStudents: (params?: IGetListStudentParams) => void;
}
export const useGetListStudents = (): IUseGetListStudents => {
  const [listStudents, setListStudents] = useState<IGetListStudentsData[] | null>(null);

  const getListStudents = (params?: IGetListStudentParams) => {
    $api.get('/students/dropdown/name', {
      params: { orderByColumn: 'id', ...params },
    })
      .then((response: AxiosResponse<IGetListStudentsData[] | null>) => {
        setListStudents(response.data);
      });
  };

  return { listStudents, getListStudents };
};

interface IGetListAdministratorsParams {
  orderByColumn?: 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'created' | 'updated';
  orderBy?: OrderBy;
}
interface IUseGetListAdministrators {
  listAdmins: IUserNoMail[] | null;
  getListAdministrators: (params?: IGetListAdministratorsParams) => void;
}

export const useGetListAdministrators = (): IUseGetListAdministrators => {
  const [listAdmins, setListAdmins] = useState<IUserNoMail[] | null>(null);

  const getListAdministrators = (params?: IGetListAdministratorsParams) => {
    $api.get('/users/dropdown/admin', {
      params: { orderByColumn: 'lastName', ...params },
    })
      .then((response: AxiosResponse<IUserNoMail[] | null>) => {
        setListAdmins(response.data);
      });
  };

  return { listAdmins, getListAdministrators };
};

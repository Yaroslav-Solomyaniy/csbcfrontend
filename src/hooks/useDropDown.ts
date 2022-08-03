import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../types';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';

// GET LIST GROUPS

interface IGetListGroupsParams {
  orderBy?: OrderBy;
  curatorName?: string;
  page?: number;
  limit?: number;
}

interface IGetListGroupsData {
  id: number;
  name: string;
}

export interface IUseGetListGroups {
  optionsGroups: IPaginateData<IGetListGroupsData> | null;
  getListGroups: (params?: IGetListGroupsParams) => void;
}

export const useGetListGroups = (): IUseGetListGroups => {
  const { addErrors } = useMessagesContext();
  const { user } = useAuthContext();
  const [optionsGroups, setOptionsGroups] = useState<IPaginateData<IGetListGroupsData> | null>(null);

  const getListGroups = (params?: IGetListGroupsParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups/dropdown/name`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { limit: 100, orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetListGroupsData> | null>) => {
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
  orderBy?: OrderBy;
  curatorName?: string;
  page?: number;
  limit?: number;
}

interface IGetListCuratorsData {
  'id': number;
  'firstName': string;
  'lastName': string;
  'patronymic': string;
}

interface IUseGetListCurators {
  optionCurators: IPaginateData<IGetListCuratorsData> | null;
  getListCurators: (params?: IGetListCuratorsParams) => void;
}

export const useGetListCurators = (): IUseGetListCurators => {
  const { addErrors } = useMessagesContext();
  const { user } = useAuthContext();
  const [optionCurators, setOptionCurators] = useState<IPaginateData<IGetListCuratorsData> | null>(null);

  const getListCurators = (params?: IGetListCuratorsParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups/dropdown/curators/`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { limit: 100, orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetListCuratorsData> | null>) => {
        setOptionCurators(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { optionCurators, getListCurators };
};

// GET LIST COURSES

export interface IGetListCoursesData {
  id: number;
  name: string;
  credits: number;
  lectureHours: number;
  isActive: boolean;
  semester: number;
  isCompulsory: boolean;
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
  optionCourses: IPaginateData<IGetListCoursesData> | null;
  getListCourses: () => void;
}

export const useGetListCourses = (): IUseGetListCourses => {
  const { addErrors } = useMessagesContext();
  const { user } = useAuthContext();
  const [optionCourses, setOptionCourses] = useState<IPaginateData<IGetListCoursesData> | null>(null);

  const getListCourses = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses/course/dropdown`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { limit: 100, orderBy: 'DESC' },
    })
      .then((response: AxiosResponse<IPaginateData<IGetListCoursesData> | null>) => {
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
  orderBy?: OrderBy;
  teacherName?: string;
  page?: string;
  limit?: string;
}

interface IGetListTeachersData {
  'id': number;
  'firstName': string;
  'lastName': string;
  'patronymic': string;
}

interface IUseGetListTeachers {
  listTeachers: IPaginateData<IGetListTeachersData> | null;
  getListTeachers: (params?: IGetListTeachersParams) => void;
}

export const useGetListTeachers = (): IUseGetListTeachers => {
  const { addErrors } = useMessagesContext();
  const { user } = useAuthContext();
  const [listTeachers, setListTeachers] = useState<IPaginateData<IGetListTeachersData> | null>(null);

  const getListTeachers = (params?: IGetListTeachersParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/dropdown/teacher`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { limit: 100, orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetListTeachersData> | null>) => {
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
  orderBy?: OrderBy;
  teacherName?: string;
  page?: string;
  limit?: string;
}

interface IGetListStudentsData {
  'id': number;
  'firstName': string;
  'lastName': string;
  'patronymic': string;
}

interface IUseGetListStudents {
  listStudents: IPaginateData<IGetListStudentsData> | null;
  getListStudents: (params?: IGetListStudentParams) => void;
}

export const useGetListStudents = (): IUseGetListStudents => {
  const { addErrors } = useMessagesContext();
  const { user } = useAuthContext();
  const [listStudents, setListStudents] = useState<IPaginateData<IGetListStudentsData> | null>(null);

  const getListStudents = (params?: IGetListStudentParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/dropdown/student`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        limit: 100,
        orderBy: 'DESC',
        ...params,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGetListStudentsData> | null>) => {
        setListStudents(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { listStudents, getListStudents };
};

interface IGetListAdministratorsParams {
  orderByColumn?: 'id' | 'firstname' | 'lastname' | 'email' | 'role' | 'created' | 'updated';
  orderBy?: OrderBy;
  page?: number;
  limit?: number;
}

interface IGetListAdministratorsData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}

interface IUseGetListAdministrators {
  listAdmins: IPaginateData<IGetListAdministratorsData> | null;
  getListAdministrators: (params?: IGetListAdministratorsParams) => void;
}

export const useGetListAdministrators = (): IUseGetListAdministrators => {
  const { addErrors } = useMessagesContext();
  const { user } = useAuthContext();
  const [listAdmins, setListAdmins] = useState<IPaginateData<IGetListAdministratorsData> | null>(null);

  const getListAdministrators = (params?: IGetListAdministratorsParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/dropdown/admin`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { limit: 100, orderBy: 'DESC', orderByColumn: 'updated', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetListAdministratorsData> | null>) => {
        setListAdmins(response.data);
      })
      .catch((error) => {
        addErrors(error.message);
      });
  };

  return { listAdmins, getListAdministrators };
};

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IPaginateData, OrderBy } from '../types';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';

export interface IGetTeacherParams {
  teacherId?: number;
  groups: number[];
  courses: number[];
  orderBy?: OrderBy;
  page?: number;
  limit?: number;
}

interface IGetTeacherDataCoursesGroups {
  id: number;
  name: string;
  orderNumber: string;
}

interface IGetTeacherDataCourses {
  id: number;
  name: string;
  credits: number;
  lectureHours: number;
  isActive: boolean;
  semester: number;
  isCompulsory: boolean;
  isExam: boolean;
  groups: IGetTeacherDataCoursesGroups[];
}

export interface IGetTeacherData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  courses: IGetTeacherDataCourses[];
}

export interface IUseTeachersGet {
  data: IPaginateData<IGetTeacherData> | null;
  getTeacher: (params?: IGetTeacherParams) => void;
}

export const useTeacherGet = (): IUseTeachersGet => {
  const { addErrors } = useMessagesContext();
  const { user } = useAuthContext();
  const [data, setData] = useState<IPaginateData<IGetTeacherData> | null>(null);

  const getTeacher = (params?: IGetTeacherParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/teacher/courses`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'id', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetTeacherData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getTeacher };
};

export interface ITeacher {
  id?: number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  courses: number[];
}

interface IDataPatchTeachersItem {
  message: string;
}

export interface IUsePatchTeacher {
  data: IDataPatchTeachersItem | null;
  patchTeacher: (params: ITeacher, id: number) => void;
}

export const useTeacherPatch = (): IUsePatchTeacher => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IDataPatchTeachersItem | null>(null);
  const { addErrors } = useMessagesContext();

  const patchTeacher = (params: ITeacher, id: number): void => {
    axios.patch(`${process.env.REACT_APP_API_URL}/user/teacher/${id}`, params, {
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

  return { data, patchTeacher };
};

export interface IUseDeleteTeacher {
  data: IDataPatchTeachersItem | null;
  deleteTeacher: (id: number) => void;
}

export const useDeleteTeacher = (): IUseDeleteTeacher => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IDataPatchTeachersItem | null>(null);
  const { addErrors } = useMessagesContext();

  const deleteTeacher = (id: number): void => {
    axios.delete(`${process.env.REACT_APP_API_URL}/user/teacher/${id}`, {
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

  return { data, deleteTeacher };
};

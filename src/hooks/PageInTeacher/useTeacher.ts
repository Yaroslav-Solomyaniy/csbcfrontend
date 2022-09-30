import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';
import { FetchSuccess, IPaginateData, OrderBy } from '../../types';

export interface IGetPageTeacherParams {
  orderByColumn?:
    | 'id'
    | 'firstname'
    | 'lastName'
    | 'email'
    | 'role'
    | 'created'
    | 'updated';
  orderBy?: OrderBy;
  studentId?:number;
  groupId?: number;
  courseId?: number;
  page?: number;
  limit?: number;
}
export interface IGetPageTeacherData {
  id: number;
  student: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
    };
    group: {
      id: number;
      name: string;
    };
  };
  course: {
    id: number;
    name: string;
  };
  grade: number;
}

export interface IUsePageTeacherGet {
  data: IPaginateData<IGetPageTeacherData> | null;
  pageTeacherGet: (params?: IGetPageTeacherParams) => void;
}

export const UsePageTeacherGet = (): IUsePageTeacherGet => {
  const { user } = AuthContext();
  const [data, setData] = useState<IPaginateData<IGetPageTeacherData> | null>(null);
  const { addErrors } = MessagesContext();

  const pageTeacherGet = (params?: IGetPageTeacherParams): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/teacher/page`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { /* orderByColumn: 'created', */ orderBy: 'DESC', ...params },
    }).then((response: AxiosResponse<IPaginateData<IGetPageTeacherData>>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, pageTeacherGet };
};

export interface IGetPageTeacherByIdData {
  id: number;
  student: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
    };
    group: {
      id: number;
      name: string;
    };
  };
  course: {
    id: number;
    name: string;
  };
  grade: number;
}

export interface IUsePageTeacherGetById {
  data:IGetPageTeacherByIdData | null;
  pageTeacherGetById: (id:number) => void;
}

export const UsePageTeacherGetById = (): IUsePageTeacherGetById => {
  const { user } = AuthContext();
  const [data, setData] = useState<IGetPageTeacherByIdData| null>(null);
  const { addErrors } = MessagesContext();

  const pageTeacherGetById = (id:number): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/teacher/page/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((response: AxiosResponse<IGetPageTeacherByIdData>) => {
      setData(response.data);
    }).catch((error) => {
      addErrors(error.response.data.message);
    });
  };

  return { data, pageTeacherGetById };
};

export interface IPageTeacherEditByIdParams {
  courseId: number;
  grade: number;
  reasonForChange: string;
}

export interface IUseTeacherPageEditRating {
  data: FetchSuccess | null;
  teacherPageEditRating: (params: IPageTeacherEditByIdParams, id: number) => void;
}

export const useTeacherPageEditRating = (): IUseTeacherPageEditRating => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const teacherPageEditRating = (params: IPageTeacherEditByIdParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/users/teacher/page/student/${id}`, params, {
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

  return { data, teacherPageEditRating };
};

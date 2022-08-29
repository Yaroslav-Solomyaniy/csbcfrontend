import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';
import { FetchSuccess, IPaginateData } from '../types';

export interface IGradesCreateParams {
  studentId: number;
  courseId: number;
  grade: number;
}

export interface IGradesCreateData {
  id: number;
}

export interface IGetGradesParams {
  orderByColumn?: string;
  orderBy?: string;
  search?: string;
  studentId?: number;
  courseId?: number;
  grade?: number;
  page?: number;
  limit?: number;
}

export interface IGetGradesData {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
  };
  grades: {
    id: number;
    grade: string;
    course: {
      id: number;
      name: string;
    };
  } [];
  group: {
    id: number;
    name: string;
    orderNumber: string;
  };
}

export interface IUseGradesGet {
  data: IPaginateData<IGetGradesData> | null;
  getEstimateStudent: (params?: IGetGradesParams) => void;
}

export const useGradesGet = (): IUseGradesGet => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IPaginateData<IGetGradesData> | null>(null);

  const getEstimateStudent = (params?: IGetGradesParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        // orderByColumn: 'id',
        orderBy: 'DESC',
        ...params,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGetGradesData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getEstimateStudent };
};

// get course by id

interface IGetGradesIdParams {
  id: number;
}

export interface IUseGradesGetId {
  data: IGetGradesData | null;
  getEstimatesId: (params: IGetGradesIdParams) => void;
}

export const useGradesGetId = (): IUseGradesGetId => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IGetGradesData | null>(null);

  const getEstimatesId = (params: IGetGradesIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades/student/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetGradesData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getEstimatesId };
};

export interface ICourseEditParams {
  courseId: number;
  grade: number;
}

export interface IUseEstimatesEdit {
  data: FetchSuccess | null;
  gradesEdit: (params: ICourseEditParams, id: number) => void;
}

export const useGradesEdit = (): IUseEstimatesEdit => {
  const { user } = useAuthContext();
  const { addErrors, addInfo } = useMessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const gradesEdit = (params: ICourseEditParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/grades/student/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData(response.data);
        addInfo('Оцінку успішно відредаговано.');
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, gradesEdit };
};

interface IGradesHistoryGetIdParams {
  name?: string;
  orderByColumn?: string;
  orderBy?: string;
  studentId?: number;
  userId?: string;
  courseId?: number;
  grade?: number;
  reasonOfChange?: string;
  page?: number;
  limit?: number;
}

export interface IGradesHistoryGetIdData {
  id: number;
  student: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
    };
  };
  grade: number;
  course: {
    id: number;
    name: string;
  };
  userChanged: {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
  };
  createdAt: string;
  reasonOfChange: string;
}

export interface IUseGradesHistoryGetId {
  data: IPaginateData<IGradesHistoryGetIdData> | null;
  getGradesHistory: (params: IGradesHistoryGetIdParams) => void;
}

export const useGradesHistoryGet = (): IUseGradesHistoryGetId => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IPaginateData<IGradesHistoryGetIdData> | null>(null);

  const getGradesHistory = (params: IGradesHistoryGetIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades-history`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params,
    })
      .then((response: AxiosResponse<IPaginateData<IGradesHistoryGetIdData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getGradesHistory };
};

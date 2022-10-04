import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FetchSuccess, IPaginateData } from '../../types';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';

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
  groupId?: number;
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
    grade: number;
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
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
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
  getGradesId: (params: IGetGradesIdParams) => void;
}

export const useGradesGetId = (): IUseGradesGetId => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetGradesData | null>(null);

  const getGradesId = (params: IGetGradesIdParams) => {
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

  return { data, getGradesId };
};

export interface IGradeEditParams {
  courseId: number;
  grade: number;
  reasonForChange: string;
}

export interface IUseGradesEdit {
  data: FetchSuccess | null;
  gradesEdit: (params: IGradeEditParams, id: number) => void;
}

export const useGradesEdit = (): IUseGradesEdit => {
  const { user } = AuthContext();
  const { addErrors, addInfo } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const gradesEdit = (params: IGradeEditParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/grades/student/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<FetchSuccess | null>) => {
        setData({ success: true });
        addInfo('Оцінку успішно відредаговано.');
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, gradesEdit };
};

interface IGradesHistoryGetIdParams {
  courseId?: number;
  semester?: number;
}

export interface IGradesHistoryGetIdData {
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
  gradesHistories: IGradesHistoryGetIdDataGradesHistories [];
}

export interface IGradesHistoryGetIdDataGradesHistories {
  id: number;
  grade: number;
  course: {
    id: 1;
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
  data: IGradesHistoryGetIdData | null;
  getGradesHistory: (params: IGradesHistoryGetIdParams, id: number) => void;
}

export const useGradesHistoryGet = (): IUseGradesHistoryGetId => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGradesHistoryGetIdData | null>(null);

  const getGradesHistory = (params: IGradesHistoryGetIdParams, id: number) => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades-history/student/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: {
        id,
        ...params,
      },
    })
      .then((response: AxiosResponse<IGradesHistoryGetIdData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getGradesHistory };
};
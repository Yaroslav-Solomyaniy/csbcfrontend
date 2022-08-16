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

export interface IUseGradesCreate {
  data: IGradesCreateData | null;
  createGrades: (params: IGradesCreateParams) => void;
}

export const useCreateGrades = (): IUseGradesCreate => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IGradesCreateData | null>(null);

  const createGrades = (params: IGradesCreateParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/grades`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGradesCreateData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.message);
      });
  };

  return { data, createGrades };
};

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
  // lastName: string;
  // firstName: string;
  // patronymic: string;
  courses: { id: number; grade: number; }[];
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

interface IGetGradesIdData {
  id: number;
  grade: number;
  student: {
    id: number;
    dateOfBirth: string;
    group: {
      id: number;
      name: string;
    };
    orderNumber: string;
    edeboId: string;
    isFullTime: boolean;
  };
  course: {
    id: number;
    name: string;
    credits: number;
    lectureHours: number;
    isActive: boolean;
    semester: number;
    isCompulsory: boolean;
    isExam: boolean;
  };
}

export interface IUseGradesGetId {
  data: IGetGradesIdData | null;
  getEstimatesId: (params: IGetGradesIdParams) => void;
}

export const useGradesGetId = (): IUseGradesGetId => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IGetGradesIdData | null>(null);

  const getEstimatesId = (params: IGetGradesIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetGradesIdData | null>) => {
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
  estimatesEdit: (params: ICourseEditParams, id: number) => void;
}

export const useEstimatesEdit = (): IUseEstimatesEdit => {
  const { user } = useAuthContext();
  const { addErrors, addInfo } = useMessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const estimatesEdit = (params: ICourseEditParams, id: number) => {
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

  return { data, estimatesEdit };
};
//
// export interface IUseCourseDelete {
//   data: FetchSuccess | null;
//   courseDelete: (id: number) => void;
// }
//
// export const useCourseDelete = (): IUseCourseDelete => {
//   const { user } = useAuthContext();
//   const { addErrors } = useMessagesContext();
//   const [data, setData] = useState<FetchSuccess | null>(null);
//
//   const courseDelete = (id: number) => {
//     axios.delete(`${process.env.REACT_APP_API_URL}/courses/${id}`, {
//       headers: {
//         Authorization: `Bearer ${user?.accessToken}`,
//       },
//     })
//       .then((response: AxiosResponse<FetchSuccess | null>) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         addErrors(error.response.data.message);
//       });
//   };
//
//   return { data, courseDelete };
// }

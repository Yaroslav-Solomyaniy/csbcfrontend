import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAuthContext } from '../context/useAuthContext';
import { useMessagesContext } from '../context/useMessagesContext';
import { IPaginateData } from '../types';

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
  orderByColumn: string;
  orderBy: string;
  search: string;
  studentId: number;
  courseId: number;
  grade: number;
  page: number;
  limit: number;
}

export interface IGetGradesData {
  id: number;
  grade: number;
  student: {
    id: number;
    dateOfBirth: string;
    group: {
      id: number;
      name: '1Т-15';
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

export interface IUseGradesGet {
  data: IPaginateData<IGetGradesData> | null;
  getCourses: (params?: IGetGradesParams) => void;
}

export const useGradesGet = (): IUseGradesGet => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IPaginateData<IGetGradesData> | null>(null);

  const getCourses = (params?: IGetGradesParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'updated', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetGradesData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getCourses };
};

// get course by id

interface IGetGradesIdParams {
  id: string;
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
  getCourseId: (params: IGetGradesIdParams) => void;
}

export const useGradesGetId = (): IUseGradesGetId => {
  const { user } = useAuthContext();
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<IGetGradesIdData | null>(null);

  const getCourseId = (params: IGetGradesIdParams) => {
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

  return { data, getCourseId };
};
//
// export interface ICourseEditParams {
//   name: string;
//   credits: number | null;
//   lectureHours: number | null;
//   isActive?: boolean;
//   semester: number;
//   isCompulsory: boolean | string;
//   isExam: boolean;
//   teacher: number;
//   groups: number [];
// }
//
// export interface IUseCourseEdit {
//   data: FetchSuccess | null;
//   courseEdit: (params: ICourseEditParams, id: number) => void;
// }
//
// export const useCourseEdit = (): IUseCourseEdit => {
//   const { user } = useAuthContext();
//   const { addErrors } = useMessagesContext();
//   const [data, setData] = useState<FetchSuccess | null>(null);
//
//   const courseEdit = (params: ICourseEditParams, id: number) => {
//     axios.patch(`${process.env.REACT_APP_API_URL}/courses/${id}`, params, {
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
//   return { data, courseEdit };
// };
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

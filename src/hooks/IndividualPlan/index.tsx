import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';

export interface IGetInvPlanParams {
  id:number;
 semester?: number;
}
export interface IGetInvPlanData{
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
  };
  grades:
    {
      id: number;
      grade: number;
      course: {
        id: number;
        name: string;
        credits: number;
        lectureHours: number;
        isActive: boolean;
        semester: number;
        type: string;
        isExam: true;
        teacher: {
          id: number;
          firstName: string;
          lastName: string;
          patronymic: string;
          email: string;
        };
      };
    }[];
}

export interface IUseIndvPlanGet {
  data: IGetInvPlanData | null;
  getPlan: (params: IGetInvPlanParams) => void;
}

export const useIndvPlanGet = (): IUseIndvPlanGet => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetInvPlanData | null>(null);

  const getPlan = (params: IGetInvPlanParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/students/get-individual-plan/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { semester: params.semester },
    })
      .then((response: AxiosResponse<IGetInvPlanData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getPlan };
};

// export interface IGetDownloadIndvPlanParams {
//   id: number;
//   semester: number;
// }
// export interface IGetDownloadIndvPlanData{
//
// }
//
// export interface IUseIndvPlanGet {
//   data: IGetInvPlanData | null;
//   getPlan: (params?: IGetInvPlanParams) => void;
// }
//
// export const useIndvPlanGet = (): IUseIndvPlanGet => {
//   const { user } = AuthContext();
//   const { addErrors } = MessagesContext();
//   const [data, setData] = useState<IGetInvPlanData | null>(null);
//
//   const getPlan = (params?: IGetInvPlanParams) => {
//     axios.get(`${process.env.REACT_APP_API_URL}/students/get-individual-plan/${params?.id}`, {
//       headers: {
//         Authorization: `Bearer ${user?.accessToken}`,
//       },
//       params: { ...params },
//     })
//       .then((response: AxiosResponse<IGetInvPlanData | null>) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         addErrors(error.response.data.message);
//       });
//   };
//
//   return { data, getPlan };
// };
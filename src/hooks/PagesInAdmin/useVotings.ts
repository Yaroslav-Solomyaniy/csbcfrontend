import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../context/All/AuthContext';
import { MessagesContext } from '../../context/All/Messages';
import { FetchSuccess, IPaginateData, OrderBy } from '../../types';

export interface ICreateVotingParams {
  groups: number[];
  startDate: Date | string | null;
  endDate: Date | string | null;
  requiredCourses: number[];
  notRequiredCourses: number[];
}

export interface ICreateVotingData {
  id: number;
  startDate: string;
  endDate: string;
}

export interface IUseVotingAdmCreate {
  data: ICreateVotingData | null;
  votingCreate: (params: ICreateVotingParams) => void;
}

export const useVotingCreate = (): IUseVotingAdmCreate => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<ICreateVotingData | null>(null);

  const votingCreate = (params: ICreateVotingParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/voting`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse< ICreateVotingData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, votingCreate };
};

export interface IGetVotingAdminParams {
  orderByColumn?: 'id'
    | ' Groups'
    | 'startDate'
    | 'endDate'
    | 'requiredCourses'
    | 'notRequiredCourses'
    | 'created'
    | 'updated';
  orderBy?: OrderBy;
  search?: string;
  id?: number;
  name?: string;
  groups?:number;
  startDate?: string;
  endDate?: string;
  status?: string;
  requiredCourses?:number[];
  notRequiredCourses?:number[];
  page?: number;
  limit?: number;
}

export interface IGetVotingAdminData {
  id: number;
  groups: {
    id:number;
    name:string;
    orderNumber: string;
  }[];
  startDate: string;
  endDate: string;
  tookPart: number;
  allStudents: number;
  status: string;
}

export interface IUseVotingGet {
  data: IPaginateData<IGetVotingAdminData> | null;
  votingGet: (params?: IGetVotingAdminParams) => void;
}

export const useVotingGet = (): IUseVotingGet => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGetVotingAdminData> | null>(null);

  const votingGet = (params?: IGetVotingAdminParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/voting`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGetVotingAdminData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, votingGet };
};

interface IGetVotingByIdParams {
  id: string;
}

interface IGetVotingByIdData {
  id: number;
  groups: {
    id:number;
    name:string;
    orderNumber: string;
  }[];
  startDate: Date | string | null;
  endDate: Date | string | null;
  requiredCourses: {
    id: number;
    name: string;
  }[];
  notRequiredCourses: {
    id: number;
    name: string;
  }[];
}

export interface IUseVotingGetById {
  data: IGetVotingByIdData | null;
  getVotingById: (params: IGetVotingByIdParams) => void;
}

export const useVotingGetById = (): IUseVotingGetById => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetVotingByIdData | null>(null);

  const getVotingById = (params: IGetVotingByIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/voting/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetVotingByIdData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getVotingById };
};

export interface IVotingEditParams {
  groups: number[];
  startDate: Date | string | null;
  endDate: Date | string | null;
  requiredCourses: number[];
  notRequiredCourses: number[];
  isRevote?:boolean;
}

export interface IUseVotingEdit {
  data: FetchSuccess | null;
  votingEdit: (params: IVotingEditParams, id: number) => void;
}

export const useVotingEdit = (): IUseVotingEdit => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const votingEdit = (params: IVotingEditParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/voting/${id}`, params, {
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

  return { data, votingEdit };
};

export interface IUseVotingDelete {
  data: FetchSuccess | null;
  votingDelete: (id: number) => void;
}

export const useVotingDelete = (): IUseVotingDelete => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const votingDelete = (id: number) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/voting/${id}`, {
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

  return { data, votingDelete };
};

interface IGetVotingResultByIdParams {
  id: number;
}

export interface IGetVotingResultDataById {
  id: number | string;
  tookPart: number;
  status: string;
  groups:
    {
      id: number | string;
      name: string;
    }[];
  startDate: string;
  students: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
    };
    group:{
      id: number;
      name: string;
    };
    'isVoted': boolean;
  }[];
  courses:
    {
      id: number | string;
      name: string;
      semester: number;
      type:string;
       teacher: {
        id: number | string;
        firstName: string;
        lastName: string;
        patronymic: string;
      };
      allVotes: number;
    }[];
}

export interface IUseVotingGetResultById {
  data: IGetVotingResultDataById | null;
  votingGetResultById: (params: IGetVotingResultByIdParams) => void;
}

export const useVotingGetResultById = (): IUseVotingGetResultById => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetVotingResultDataById | null>(null);

  const votingGetResultById = (params: IGetVotingResultByIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/voting/${params.id}/result`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetVotingResultDataById | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, votingGetResultById };
};

interface IGetVotingSubmitDataByIdParams {
  id: number;
}

export interface IGetVotingSubmitDataById {
  id: number;
  groups:
  {
    id: number;
    name: string;
  }[];
  startDate: string;
  requiredCourses:
    {
    id: number;
    name: string;
    semester: number;
    teacher: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
    };
    allVotes: number;
  }[];
  notRequiredCourses:
  {
    id: number;
    name: string;
    semester: number;
    teacher: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
    };
    allVotes: number;
  }[];
}

export interface IUseVotingGetSubmitDataById {
  data: IGetVotingSubmitDataById | null;
  votingGetSubmitDataById: (params: IGetVotingSubmitDataByIdParams) => void;
}

export const useVotingGetSubmitDataById = (): IUseVotingGetSubmitDataById => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IGetVotingSubmitDataById | null>(null);

  const votingGetSubmitDataById = (params: IGetVotingResultByIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/voting/${params.id}/submit-form`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetVotingSubmitDataById | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, votingGetSubmitDataById };
};

export interface IVotingSubmitParams {
  id: number;
  course: number[];
}

export interface IVotingSubmitData {
  message: string;
}

export interface IUseVotingSubmit {
  data: IVotingSubmitData | null;
  votingSubmit: (params: IVotingSubmitParams) => void;
}

export const useVotingSubmit = (): IUseVotingSubmit => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IVotingSubmitData | null>(null);

  const votingSubmit = (params: IVotingSubmitParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/voting/${params.id}/courses/submit`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IVotingSubmitData | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, votingSubmit };
};

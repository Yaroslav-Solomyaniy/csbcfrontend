import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { IPaginateData, OrderBy } from '../types';

// Отримуємо дані про всі групи

interface IGetGroupParams {
  orderByColumn?:
    | 'id'
    | 'Name'
    | 'curator_id'
    | 'order_number'
    | 'deleted_order_number'
    | 'created'
    | 'updated';
  orderBy?: OrderBy;
  search?: string;
  name?: string;
  curatorId?: number;
  orderNumber?: string;
  deletedOrderNumber?: string;
  page?: number;
  limit?: number;
}

export interface IGroupData {
  'id': number;
  'name': string;
  'curator': {
    'id': number;
    'firstName': string;
    'lastName': string;
    'email': string;
    'role': string;
    'updated': string;
    'created': string;
  };
  'orderNumber': string;
  'updated': string;
  'created': string;
}

interface IUseGroupsGet {
  data: IPaginateData<IGroupData> | null;
  getGroups: (params?: IGetGroupParams) => void;
}

export const useGroups = (): IUseGroupsGet => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IPaginateData<IGroupData> | null>(null);

  const getGroups = (params?: IGetGroupParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IGroupData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { data, getGroups };
};

// Запрос на створення нової групи

export interface ICreateGroupParams {
  'name': string;
  'curatorId': number;
  'orderNumber': string;
}

interface ICreateGroupResponse {
  'id': number;
  'name': string;
}

interface IUseGroupsCreate {
  data: ICreateGroupResponse | null;
  createGroup: (params: ICreateGroupParams) => void;
}

export const useGroupsCreate = (): IUseGroupsCreate => {
  const { user } = useAuthContext();
  const [data, setData] = useState<ICreateGroupResponse | null>(null);

  const createGroup = (params: ICreateGroupParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/groups`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<ICreateGroupResponse>) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { data, createGroup };
};

// Отримуємо дані по id групи

interface IGetGroupIdParams {
  id: string;
}

interface IGetGroupIdResponse {
  created: string;
  curator: { id: number; firstName: string; lastName: string; };
  deletedOrderNumber: null;
  id: number;
  name: string;
  orderNumber: string;
  updated: string;
}

interface IUseGroupId {
  data: IGetGroupIdResponse | null;
  getGroupId: (params: IGetGroupIdParams) => void;
}

export const useGroupId = (): IUseGroupId => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IGetGroupIdResponse | null>(null);

  const getGroupId = (params: IGetGroupIdParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups/${params.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGetGroupIdResponse | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { data, getGroupId };
};

export interface IGroupEditParams {
  name: string;
  curatorId: number;
  orderNumber: string;
}

interface IUseGroupEdit {
  groupEdit: (params: IGroupEditParams, id: number) => void;
}

export const useGroupEdit = (): IUseGroupEdit => {
  const { user } = useAuthContext();

  const groupEdit = (params: IGroupEditParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/groups/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<any>) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { groupEdit };
};

export interface IGroupDeleteParams {
  deletedOrderNumber: string;
}

interface IUseGroupDelete {
  groupDelete: (params: IGroupDeleteParams, id: number) => void;
}

export const useGroupDelete = (): IUseGroupDelete => {
  const { user } = useAuthContext();

  const groupDelete = (params: IGroupDeleteParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/groups/${id}`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<any>) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { groupDelete };
};

import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { AuthContext } from '../../context/All/AuthContext';
import { FetchSuccess, IPaginateData, OrderBy } from '../../types';
import { MessagesContext } from '../../context/All/Messages';

export interface IGetGroupParams {
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
    'patronymic': string;
    'email': string;
  };
  'orderNumber': string;
  'students': number;
}

export interface IUseGroupsGet {
  data: IPaginateData<IGroupData> | null;
  getGroups: (params?: IGetGroupParams) => void;
}

export const useGroupsGet = (): IUseGroupsGet => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<IPaginateData<IGroupData> | null>(null);

  const getGroups = (params?: IGetGroupParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      params: { orderByColumn: 'created', orderBy: 'DESC', ...params },
    })
      .then((response: AxiosResponse<IPaginateData<IGroupData> | null>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, getGroups };
};

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

export interface IUseGetGroupId {
  data: IGetGroupIdResponse | null;
  getGroupId: (params: IGetGroupIdParams) => void;
}

export const useGetGroupId = (): IUseGetGroupId => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
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
        addErrors(error.response.data.message);
      });
  };

  return { data, getGroupId };
};

export interface IGroupCreateParams {
  name: string;
  curatorId: number;
  orderNumber: string;
}

interface IGroupCreateResponse {
  id: number;
  name: string;
}

export interface IUseGroupCreate {
  data: IGroupCreateResponse | null;
  groupCreate: (params: IGroupCreateParams) => void;
}

export const useGroupCreate = (): IUseGroupCreate => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [data, setData] = useState<IGroupCreateResponse | null>(null);

  const groupCreate = (params: IGroupCreateParams) => {
    axios.post(`${process.env.REACT_APP_API_URL}/groups`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IGroupCreateResponse>) => {
        setData(response.data);
      })
      .catch((error) => {
        addErrors(error.response.data.message);
      });
  };

  return { data, groupCreate };
};

export interface IGroupEditParams {
  name: string;
  curatorId: number;
  orderNumber: string;
}

export interface IUseGroupEdit {
  data: FetchSuccess | null;
  groupEdit: (params: IGroupEditParams, id: number) => void;
}

export const useGroupEdit = (): IUseGroupEdit => {
  const { user } = AuthContext();
  const { addErrors } = MessagesContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const groupEdit = (params: IGroupEditParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/groups/${id}`, params, {
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

  return { data, groupEdit };
};

export interface IGroupDeleteParams {
  deletedOrderNumber: string;
}

export interface IUseGroupDelete {
  data: FetchSuccess | null;
  groupDelete: (params: IGroupDeleteParams, id: number) => void;
}

export const useGroupDelete = (): IUseGroupDelete => {
  const { addErrors } = MessagesContext();
  const { user } = AuthContext();
  const [data, setData] = useState<FetchSuccess | null>(null);

  const groupDelete = (params: IGroupDeleteParams, id: number) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/groups/${id}`, params, {
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

  return { data, groupDelete };
};

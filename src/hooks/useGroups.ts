import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { FetchSuccess, IPaginateData, OrderBy } from '../types';

// Отримуємо дані про всі групи

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
}

export interface IUseGroupsGet {
  data: IPaginateData<IGroupData> | null;
  getGroups: (params?: IGetGroupParams) => void;
}

export const useGroupsGet = (): IUseGroupsGet => {
  const { user } = useAuthContext();
  const [data, setData] = useState<IPaginateData<IGroupData> | null>(null);

  const getGroups = (params?: IGetGroupParams) => {
    let query = '';

    if (params) {
      query = '?';
    }

    if (params?.curatorId) {
      query += `curatorId=${params.curatorId}&`;
    }

    if (params?.name) {
      query += `name=${params.name}&`;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/groups${query.slice(0, -1)}`, {
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

export interface IGroupCreateParams {
  'name': string;
  'curatorId': number;
  'orderNumber': string;
}

interface IGroupCreateResponse {
  'id': number;
  'name': string;
}

export interface IUseGroupCreate {
  data: IGroupCreateResponse | null;
  groupCreate: (params: IGroupCreateParams) => void;
}

export const useGroupCreate = (): IUseGroupCreate => {
  const { user } = useAuthContext();
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
        console.log(error);
      });
  };

  return { data, groupCreate };
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

export interface IUseGetGroupId {
  data: IGetGroupIdResponse | null;
  getGroupId: (params: IGetGroupIdParams) => void;
}

export const useGetGroupId = (): IUseGetGroupId => {
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

export interface IUseGroupEdit {
  data: FetchSuccess | null;
  groupEdit: (params: IGroupEditParams, id: number) => void;
}

export const useGroupEdit = (): IUseGroupEdit => {
  const { user } = useAuthContext();
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
        console.log(error);
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
  const { user } = useAuthContext();
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
        console.log(error);
      });
  };

  return { data, groupDelete };
};

interface IDropDownNameParams {
  orderBy?: OrderBy;
  name?: string;
  page?: number;
  limit?: number;
}

interface IDropDownNameData {
  id: number;
  name: string;
}

interface IUseDropDownName {
  groupNames: IPaginateData<IDropDownNameData> | null;
  DropDownName: (params?: IDropDownNameParams) => void;
}

export const UseDropDownName = (): IUseDropDownName => {
  const { user } = useAuthContext();
  const [groupNames, setGroupNames] = useState<IPaginateData<IDropDownNameData> | null>(null);

  const DropDownName = (params?: IDropDownNameParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups/dropdown/name`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IDropDownNameData> | null>) => {
        setGroupNames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { groupNames, DropDownName };
};

interface IDropDownCuratorsParams {
  orderBy?: OrderBy;
  curatorName?: string;
  page?: number;
  limit?: number;
}

interface IDropDownCuratorsData {
  'id': number;
  'firstName': string;
  'lastName': string;
  'patronymic': string;
}

interface IUseDropDownCurators {
  curators: IPaginateData<IDropDownCuratorsData> | null;
  DropDownCurators: (params?: IDropDownCuratorsParams) => void;
}

export const UseDropDownCurators = (): IUseDropDownCurators => {
  const { user } = useAuthContext();
  const [curators, setCurators] = useState<IPaginateData<IDropDownCuratorsData> | null>(null);

  const DropDownCurators = (params?: IDropDownCuratorsParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups/dropdown/curators`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((response: AxiosResponse<IPaginateData<IDropDownCuratorsData> | null>) => {
        setCurators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { curators, DropDownCurators };
};

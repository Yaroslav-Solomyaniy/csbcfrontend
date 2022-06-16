import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { OrderBy } from '../types';

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

interface IUseGroups {
  data: any;
  getGroups: (params?: IGetGroupParams) => void;
}

const useGroups = (): IUseGroups => {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);

  const getGroups = (params?: IGetGroupParams) => {
    axios.get(`${process.env.REACT_APP_API_URL}/groups`, {
      headers: {
        Authorization: 'Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIi'
          + 'OjEsInJvbGUiOiJyb290Iiwia'
          + 'WF0IjoxNjU1MzkxMjIzLCJleHAiOjE2NTU0MzQ0MjN9.'
          + 'VGa-riy2s7FmCUkzzxc4og8_e-u7L7kZykzP4jC2_EM',
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { data, getGroups };
};

export default useGroups;

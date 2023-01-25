import axios from 'axios';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { MessagesContext } from '../../../context/All/Messages';
import $api from '../config';

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginData {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: 'admin' | 'student' | 'curator' | 'teacher';
  accessToken: string;
  refreshToken: string;
}

interface ILogin {
  data: LoginData | null;
  postLogin: (params: LoginParams, check: boolean) => void;
  checked: boolean;
}

interface IDecodedData{
  sub:number;
  role:string;
  iat: number;
  exp: number;
}

export const useLogin = (): ILogin => {
  const [data, setData] = useState<LoginData | null>(null);
  const [checked, setChecked] = useState(false);
  const { addErrors } = MessagesContext();

  const postLogin = (params: LoginParams, check: boolean) => {
    axios.post(`${process.env.REACT_APP_API_URL}auth/login`, params)
      .then((response) => {
        const decode: IDecodedData = jwt_decode(`${response.data?.accessToken}`);

        setData({ ...response.data, role: decode.role });
      }).catch((e) => {
        addErrors(e.response.data.message);
      });
    setChecked(check);
  };

  return { data, postLogin, checked };
};

export interface ForgotPassword {
  email: string;
}

export const useForgotPassword = (): { postForgotPassword: (params: ForgotPassword) => void; } => {
  const { addErrors, addInfo } = MessagesContext();

  const postForgotPassword = (params: ForgotPassword) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, params).then(() => {
      addInfo(`Новий пароль надіслано на пошту ${params.email}`);
    }).catch((e) => {
      addErrors(e.response.data.message);
    });
  };

  return { postForgotPassword };
};

export interface IPassword {
  oldPassword: string;
  newPassword: string;
  email: string | undefined;
}

interface IChangePassword {
  patchChangePassword: (params: IPassword) => void;
}

export const useChangePassword = (): IChangePassword => {
  const { addInfo } = MessagesContext();
  const patchChangePassword = (params: IPassword) => {
    $api.patch('/auth/change-password', params).then((e) => {
      addInfo(`${e.data.success && 'Пароль змінено'}`);
    });
  };

  return { patchChangePassword };
};

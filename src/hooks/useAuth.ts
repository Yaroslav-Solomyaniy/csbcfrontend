import axios from 'axios';
import { useState } from 'react';

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  updated: string;
  created: string;
  accessToken: string;
  refreshToken: string;
}

interface Register {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  uniqueItems: true;
  role: string;
  studentData: StudentData;
  password: string;
}

interface StudentData {
  dateOfBirth: string;
  group: string;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean;
}

export interface ForgotPassword {
  login: string;
}

export interface IChangePassword {
  password: string;
}

export const useLogin = (): {
  data: LoginData | null;
  postLogin: (params: LoginParams) => void;
  error: string|null;
  clearError: ()=>void;
} => {
  const [data, setData] = useState<LoginData|null>(null);
  const [error, setError] = useState<string|null>(null);

  const postLogin = (params: LoginParams) => {
    axios.post('/auth/login', params).then((response) => {
      setData(response.data);
      setError(null);
    }).catch((e) => {
      setError(e.message);
    });
  };

  const clearError = ():void => {
    setError(null);
  };

  return { data, postLogin, error, clearError };
};

export const useRefreshToken = ():{
  authGet:() =>void;
} => {
  const authGet = () => {
    axios.get('auth/refresh-token').then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { authGet };
};

export const useRegister = (): {
  postRegister: (params: Register) => void;
} => {
  const postRegister = (params: Register) => {
    axios.post('/auth/register', params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { postRegister };
};

export const useForgotPassword = (): {
  postForgotPassword: (params: ForgotPassword) => void;
} => {
  const postForgotPassword = (params: ForgotPassword) => {
    axios.post('/auth/forgot-password', params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { postForgotPassword };
};

export const useChangePassword = (): {
  patchChangePassword: (params: IChangePassword) => void;
} => {
  const patchChangePassword = (params: IChangePassword) => {
    axios.patch('/auth/change-password', params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { patchChangePassword };
};

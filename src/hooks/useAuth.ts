import axios from 'axios';
import { useState } from 'react';
import { useMessagesContext } from '../context/useMessagesContext';

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

export const useLogin = (): {
  data: LoginData | null;
  postLogin: (params: LoginParams, check: boolean) => void;
  checked: boolean;
} => {
  const [data, setData] = useState<LoginData | null>(null);
  const [checked, setCheck] = useState(false);
  const { addErrors, addWarning, addInfo } = useMessagesContext();

  const postLogin = (params: LoginParams, check: boolean) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, params)
      .then((response) => {
        setData(response.data);
        setCheck(check);
      }).catch((e) => {
        addErrors(e.message);
      });
  };

  return { data, postLogin, checked };
};

export const useRefreshToken = (): {
  authGet: () => void;
} => {
  const authGet = () => {
    axios.get(`${process.env.REACT_APP_API_URL}auth/refresh-token`).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { authGet };
};

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

export const useRegister = (): {
  postRegister: (params: Register) => void;
} => {
  const postRegister = (params: Register) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { postRegister };
};

export interface ForgotPassword {
  login: string;
}

export const useForgotPassword = (): {
  error: string | null;
  postForgotPassword: (params: ForgotPassword) => void;
  clearError: () => void;
} => {
  const [error, setError] = useState<string | null>(null);

  const postForgotPassword = (params: ForgotPassword) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, params).then((e) => {
      console.log(e);
      setError(null);
    }).catch((e) => {
      setError(e.message);
    });
  };

  const clearError = (): void => {
    setError(null);
  };

  return { error, postForgotPassword, clearError };
};

export interface IChangePassword {
  password: string;
}

export const useChangePassword = (): {
  patchChangePassword: (params: IChangePassword) => void;
} => {
  const patchChangePassword = (params: IChangePassword) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/auth/change-password`, params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { patchChangePassword };
};

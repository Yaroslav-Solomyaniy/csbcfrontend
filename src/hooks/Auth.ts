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

interface ChangePassword {
  password: string;
}

export const useLogin = (): {
  data: LoginData | undefined;
  postLogin: (params: LoginParams) => void;
} => {
  const [data, setData] = useState<LoginData>();

  const postLogin = (params: LoginParams) => {
    axios.post('/auth/login', params).then((response) => {
      setData(response.data);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { data, postLogin };
};

export const useRefreshToken = () => {
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
  patchChangePassword: (params: ChangePassword) => void;
} => {
  const patchChangePassword = (params: ChangePassword) => {
    axios.patch('/auth/change-password', params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { patchChangePassword };
};

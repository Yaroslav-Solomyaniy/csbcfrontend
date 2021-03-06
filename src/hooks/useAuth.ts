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
  patronymic: string;
  email: string;
  role: string;
  updated: string;
  created: string;
  accessToken: string;
  refreshToken: string;
}

interface ILogin {
  data: LoginData | null;
  postLogin: (params: LoginParams, check: boolean) => void;
  checked: boolean;
}

export const useLogin = (): ILogin => {
  const [data, setData] = useState<LoginData | null>(null);
  const [checked, setChecked] = useState(false);
  const { addErrors } = useMessagesContext();

  const postLogin = (params: LoginParams, check: boolean) => {
    // axiosPost('auth/login', params);
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, params)
      .then((response) => {
        setData(response.data);
      }).catch((e) => {
        addErrors(e.response.data.message);
      });
    setChecked(check);
  };

  return { data, postLogin, checked };
};

interface IRefreshToken {
  data: any;
  authGet: () => void;
}

export const useRefreshToken = (): IRefreshToken => {
  const { addErrors } = useMessagesContext();
  const [data, setData] = useState<LoginData | null>(null);
  const authGet = () => {
    axios.get(`${process.env.REACT_APP_API_URL}auth/refresh-token`).then((response) => {
      setData(response.data);
    }).catch((e) => {
      addErrors(e.response.data.message);
    });
  };

  return { data, authGet };
};

// interface StudentData {
//   dateOfBirth: string;
//   group: string;
//   orderNumber: string;
//   edeboId: string;
//   isFullTime: boolean;
// }
//
// interface Register {
//   firstName: string;
//   lastName: string;
//   patronymic: string;
//   email: string;
//   uniqueItems: true;
//   role: string;
//   studentData: StudentData;
//   password: string;
// }

// export const useRegister = (): {
//   postRegister: (params: Register) => void;
// } => {
//   const postRegister = (params: Register) => {
//     axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, params).then((e) => {
//       console.log(e);
//     }).catch((e) => {
//       console.error(e);
//     });
//   };
//
//   return { postRegister };
// };

export interface ForgotPassword {
  email: string;
}

export const useForgotPassword = (): { postForgotPassword: (params: ForgotPassword) => void; } => {
  const { addErrors, addInfo } = useMessagesContext();

  const postForgotPassword = (params: ForgotPassword) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, params).then(() => {
      addInfo(`?????????? ???????????? ?????????????????? ???? ?????????? ${params.email}`);
    }).catch((e) => {
      addErrors(e.response.data.message);
    });
  };

  return { postForgotPassword };
};

export interface IPassword {
  password: string;
  accessToken: string | undefined;
}

interface IChangePassword {
  patchChangePassword: (params: IPassword) => void;
}

export const useChangePassword = (): IChangePassword => {
  const { addErrors, addInfo } = useMessagesContext();

  const patchChangePassword = (params: IPassword) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/auth/change-password`, { password: params.password }, {
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    }).then((e) => {
      addInfo(`${e.data.success
        ? '???????????? ??????????????'
        : '?????????????? ?????????? ????????????'}`);
    }).catch((e) => {
      addErrors(e.response.data.message);
    });
  };

  return { patchChangePassword };
};

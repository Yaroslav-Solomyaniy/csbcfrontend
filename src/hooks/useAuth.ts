import axios from 'axios';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useMessagesContext } from '../context/messagesContext';
import { useAuthContext } from '../context/useAuthContext';

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
  const { addErrors } = useMessagesContext();

  const postLogin = (params: LoginParams, check: boolean) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, params)
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
  const { addErrors, addInfo } = useMessagesContext();
  const { user } = useAuthContext();

  const patchChangePassword = (params: IPassword) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/auth/change-password`, params, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((e) => {
      addInfo(`${e.data.success
        ? 'Пароль змінено'
        : 'Вкажіть новий пароль'}`);
    }).catch((e) => {
      addErrors(e.response.data.message);
    });
  };

  return { patchChangePassword };
};

// import { useEffect } from 'react';
// import { useLogin } from '../hooks/Auth';
//
// export const useAuthContext = ():JSX.Element => {
//   const { postLogin, data } = useLogin();
//
//   useEffect(() => {
//     postLogin({ email: 'root@gmail.com', password: 'root@gmail.com' });
//   }, []);
//
//
//   return { token: data?.token || '' };
// };

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginData, LoginParams, useLogin } from '../hooks/Auth';

interface AuthContext {
  user: LoginData | null;
  postLogin: (credentials: LoginParams) => void;
}

const defaultValue: AuthContext = {
  user: null,
  postLogin: () => undefined,
};

export const AuthContext = createContext<AuthContext>(defaultValue);

const AuthProvider = ({ children }: { children: JSX.Element; }): JSX.Element => {
  const [user, setUser] = useState<LoginData|null>(null);
  const { postLogin, data } = useLogin();

  useEffect(() => {
    if (data) {
      localStorage.setItem('auth', JSON.stringify(data));
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    const auth: string|null = localStorage.getItem('auth') || null;

    if (auth) {
      setUser(JSON.parse(auth));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, postLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = (): AuthContext => useContext(AuthContext);

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginData, LoginParams, useLogin } from '../../hooks/All/useAuth';

interface IAuthContext {
  user: LoginData | null;
  postLogin: (credentials: LoginParams, check: boolean) => void;
  logout: () => void;
}

const defaultValue: IAuthContext = {
  user: null,
  postLogin: () => undefined,
  logout: () => undefined,
};

export const authContext = createContext<IAuthContext>(defaultValue);

const getStorageData = ():LoginData | null => {
  const authLocal: string | null = localStorage.getItem('auth') || null;
  const authSession: string | null = sessionStorage.getItem('auth') || null;

  if (authSession) {
    return JSON.parse(authSession);
  }
  if (authLocal) {
    return JSON.parse(authLocal);
  }

  return null;
};

const AuthProvider = ({ children }: { children: JSX.Element; }): JSX.Element => {
  const [user, setUser] = useState<LoginData | null>(getStorageData());
  const { postLogin, data, checked } = useLogin();

  useEffect(() => {
    if (data) {
      if (checked) {
        localStorage.setItem('auth', JSON.stringify(data));
        setUser(data);
      } else {
        sessionStorage.setItem('auth', JSON.stringify(data));
        setUser(data);
      }
    }
  }, [data]);

  useEffect(() => {
    try {
      setUser(getStorageData());
    } catch (error) {
      logout();
    }
  }, []);

  const logout = () => {
    localStorage.setItem('auth', '');
    sessionStorage.setItem('auth', '');
    setUser(null);
  };

  return (
    <authContext.Provider value={{ user, postLogin, logout }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const AuthContext = (): IAuthContext => useContext(authContext);

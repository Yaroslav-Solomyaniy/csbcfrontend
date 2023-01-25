import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginData, LoginParams, useLogin } from '../../hooks/api/all/useAuth';

interface IAuthContext {
  user: LoginData | null;
  postLogin: (credentials: LoginParams, check: boolean) => void;
  logout: () => void;
  roleAdmin: boolean;
  roleStudent: boolean;
  roleTeacher: boolean;
  roleCurator: boolean;
}

const defaultValue: IAuthContext = {
  user: null,
  postLogin: () => undefined,
  logout: () => undefined,
  roleAdmin: false,
  roleStudent: false,
  roleTeacher: false,
  roleCurator: false,
};

export const authContext = createContext<IAuthContext>(defaultValue);

const getStorageData = (): LoginData | null => {
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
        localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
        sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
        sessionStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
        setUser(data);
      } else {
        sessionStorage.setItem('auth', JSON.stringify(data));
        sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
        sessionStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
        setUser(data);
      }
    }
    if (!localStorage.getItem('open')) localStorage.setItem('open', 'true');
  }, [data]);

  useEffect(() => {
    try {
      setUser(getStorageData());
    } catch (error) {
      logout();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.clear();
    setUser(null);
  };

  const roleAdmin = user?.role === 'admin';
  const roleStudent = user?.role === 'student';
  const roleTeacher = user?.role === 'teacher';
  const roleCurator = user?.role === 'curator';

  return (
    <authContext.Provider value={{ user, postLogin, logout, roleAdmin, roleCurator, roleStudent, roleTeacher }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const AuthContext = (): IAuthContext => useContext(authContext);

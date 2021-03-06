import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginData, LoginParams, useLogin } from '../hooks/useAuth';

interface AuthContext {
  user: LoginData | null;
  postLogin: (credentials: LoginParams, check: boolean) => void;
  logout: () => void;
}

const defaultValue: AuthContext = {
  user: null,
  postLogin: () => undefined,
  logout: () => undefined,
};

export const AuthContext = createContext<AuthContext>(defaultValue);

const AuthProvider = ({ children }: { children: JSX.Element; }): JSX.Element => {
  const [user, setUser] = useState<LoginData | null>(null);
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
      const authLocal: string | null = localStorage.getItem('auth') || null;
      const authSession: string | null = sessionStorage.getItem('auth') || null;

      if (authSession) {
        setUser(JSON.parse(authSession));
      }
      if (authLocal) {
        setUser(JSON.parse(authLocal));
      }
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
    <AuthContext.Provider value={{ user, postLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = (): AuthContext => useContext(AuthContext);

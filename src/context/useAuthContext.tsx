import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginData, LoginParams, useLogin } from '../hooks/useAuth';
import { useMessagesContext } from './useMessagesContext';

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
  const { postLogin, data, error, checked } = useLogin();
  const { addErrors } = useMessagesContext();

  useEffect(() => {
    if (data) {
      if (checked) {
        localStorage.setItem('auth', JSON.stringify(data));
        console.log(true);
        setUser(data);
      } else {
        localStorage.setItem('auth', JSON.stringify(data));
        setUser(data);
      }
    }
  }, [data]);

  useEffect(() => {
    const auth: string | null = localStorage.getItem('auth') || null;

    if (auth) {
      setUser(JSON.parse(auth));
    }
  }, []);

  const logout = () => {
    localStorage.setItem('auth', '');
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

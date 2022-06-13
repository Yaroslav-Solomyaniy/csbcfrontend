import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginData, LoginParams, useLogin } from '../hooks/useAuth';
import LoginModalAuth from '../UI/LoginModalAuth/LoginModalAuth';

interface AuthContext {
  user: LoginData | null;
  postLogin: (credentials: LoginParams) => void;
  logout: ()=> void;
}

const defaultValue: AuthContext = {
  user: null,
  postLogin: () => undefined,
  logout: () => undefined,
};

export const AuthContext = createContext<AuthContext>(defaultValue);

const AuthProvider = ({ children }: { children: JSX.Element; }): JSX.Element => {
  const [user, setUser] = useState<LoginData|null>(null);
  const { postLogin, data, error, clearError } = useLogin();

  useEffect(() => {
    if (data) {
      localStorage.setItem('auth', JSON.stringify(data));
      setUser(data);
    }
  }, [data]);
  // useEffect(() => {
  //   if (data) {
  //     localStorage.setItem('auth', JSON.stringify(data));
  //     setUser(data);
  //   }
  // }, [error]);

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
    <>
      {error && (
      <LoginModalAuth error={error} closeModal={clearError} />
      )}
      {error && (
        <LoginModalAuth error={error} closeModal={clearError} />
      )}
      {error && (
        <LoginModalAuth error={error} closeModal={clearError} />
      )}
      {error && (
        <LoginModalAuth error={error} closeModal={clearError} />
      )}
      <AuthContext.Provider value={{ user, postLogin, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;

export const useAuthContext = (): AuthContext => useContext(AuthContext);

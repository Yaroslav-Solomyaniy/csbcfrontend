import { useEffect } from 'react';
import { useLogin } from '../hooks/auth';

export const useAuthContext = () => {
  const { postLogin, data } = useLogin();

  useEffect(() => {
    postLogin({ email: 'root@gmail.com', password: 'root@gmail.com' });
  }, []);

  // @ts-ignore !!!!!!!!!!!!
  return { token: data?.token || '' };
};

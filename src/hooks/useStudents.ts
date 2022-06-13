import axios from 'axios';
import { useAuthContext } from '../context/useAuthContext';

export const useGetStudents = (): void => {
  // @ts-ignore !!!!!!!!!!!!!!!!!!!!!!!!!
  const { token } = useAuthContext();

  axios.get(`${process.env.REACT_APP_API_URL}/students`, {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};

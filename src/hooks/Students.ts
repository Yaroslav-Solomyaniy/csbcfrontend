import axios from 'axios';
import { useAuthContext } from '../context/useAuthContext';

export const useGetStudents = () => {
  // @ts-ignore !!!!!!!!!!!!!!!!!!!!!!!!!
  const { token } = useAuthContext();

  axios.get('/students', {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};

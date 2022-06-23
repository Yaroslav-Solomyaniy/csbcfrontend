import axios from 'axios';
import { useAuthContext } from '../context/useAuthContext';

export interface IAddstudents {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  middleName: string;
  groupName: string;
  email: string;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean;
}

export const useGetStudents = (): void => {
  const { user } = useAuthContext();

  axios.get(`${process.env.REACT_APP_API_URL}/students`, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });
};

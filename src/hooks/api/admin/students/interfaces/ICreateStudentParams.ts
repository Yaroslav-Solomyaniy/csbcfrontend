export interface ICreateStudentParams {
  dateOfBirth: string | Date | null;
  groupId: number;
  user: ICreateUser;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean | string | undefined;
}

interface ICreateUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
}

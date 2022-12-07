interface IGroupCurator {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
  updated: string;
  created: string;
}

interface IGroup {
  id: number;
  name: string;
  curator: IGroupCurator;
  orderNumber: string;
  updated: string;
  created: string;
}

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: string;
  updated: string;
  created: string;
}

export interface IStudentData {
  id: number;
  dateOfBirth: string;
  group: IGroup;
  user: IUser;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean;
}

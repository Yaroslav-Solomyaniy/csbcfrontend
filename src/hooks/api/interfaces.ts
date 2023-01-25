// PARAMS - Create, update
export interface ICoursesParams {
  name: string;
  credits: number | null;
  lectureHours: number | null;
  isActive: boolean;
  semester: number;
  type: string;
  isExam: boolean;
  teacher: number;
  groups: number[];
}

export interface ICourseIdAndName{
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
}

export interface IUserNoMail {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}

export interface IGroup {
  id: number;
  name: string;
  orderNumber: string;
}

export interface IGroupNoOrder{
  id: number;
  name: string;
}

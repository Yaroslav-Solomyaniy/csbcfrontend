import { IGroup } from '../../../interfaces';

interface ICourse {
  id: number;
  name: string;
}
interface IGrades{
  id: number;
  grade: number;
  course: ICourse;
}

interface IUser{
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}

export interface IGetGradesData {
  id: number;
  user: IUser;
  grades:IGrades[];
  group: IGroup;
}

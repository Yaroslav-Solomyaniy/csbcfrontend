import { IGroup, ITeacher } from '../interfaces';

interface IUser{
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}
interface IStudent{
  id: number;
  user: IUser;
  group:IGroup;
  isVoted: boolean;
}
 interface ICourse{
  id: number | string;
  name: string;
  semester: number;
  type:string;
  teacher: ITeacher;
  allVotes: number;
}

export interface IGetVotingResultDataById {
  id: number | string;
  tookPart: number;
  status: string;
  groups:IGroup[];
  startDate: string;
  students: IStudent[];
  courses: ICourse[];
}

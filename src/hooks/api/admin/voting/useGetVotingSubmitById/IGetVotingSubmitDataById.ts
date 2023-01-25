import { IGroup, ITeacher } from '../interfaces';

interface ICourse {
  id: number;
  name: string;
  semester: number;
  teacher: ITeacher;
  allVotes: number;
}

export interface IGetVotingSubmitDataById {
  id: number;
  groups: IGroup[];
  startDate: string;
  requiredCourses: ICourse[];
  notRequiredCourses: ICourse[];
}

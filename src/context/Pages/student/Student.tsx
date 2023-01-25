import React, { createContext, useContext } from 'react';
import { IUseGetStudentVoting, useGetStudentVoting } from '../../../hooks/api/student/useGetVoting';
import { IUseVoteStudent, useVoteStudent } from '../../../hooks/api/student/useVoting';
import { IUseRevoteStudent, useRevoteStudent } from '../../../hooks/api/student/useRevote';

interface IStudentVotingContext {
  getVoting: IUseGetStudentVoting | null;
  vote: IUseVoteStudent | null;
  revote: IUseRevoteStudent | null;
}

const defaultValue: IStudentVotingContext = {
  getVoting: null,
  vote: null,
  revote: null,
};

export const studentVotingContext = createContext<IStudentVotingContext>(defaultValue);

const StudentVotingProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getVoting = useGetStudentVoting();
  const vote = useVoteStudent();
  const revote = useRevoteStudent();

  return (
    <studentVotingContext.Provider value={{ getVoting, vote, revote }}>
      {children}
    </studentVotingContext.Provider>
  );
};

export default StudentVotingProvider;

export const StudentVotingContext = (): IStudentVotingContext => useContext(studentVotingContext);

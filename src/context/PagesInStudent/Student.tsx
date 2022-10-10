import React, { createContext, useContext } from 'react';
import {
  IUseStudentVotingCreate,
  IUseStudentVotingGet, IUseVotingStudentRevote,
  useStudentVotingCreate,
  useStudentVotingGet, useVotingStudentRevote,
} from '../../hooks/PagesInStudents/usePageInStudents';

interface IStudentVotingContext {
  getVoting: IUseStudentVotingGet | null;
  votingCreate: IUseStudentVotingCreate | null;
  votingEdit: IUseVotingStudentRevote | null;
}

const defaultValue: IStudentVotingContext = {
  getVoting: null,
  votingCreate: null,
  votingEdit: null,
};

export const studentVotingContext = createContext<IStudentVotingContext>(defaultValue);

const StudentVotingProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getVoting = useStudentVotingGet();
  const votingCreate = useStudentVotingCreate();
  const votingEdit = useVotingStudentRevote();

  return (
    <studentVotingContext.Provider value={{
      votingEdit,
      getVoting,
      votingCreate,
    }}
    >
      {children}
    </studentVotingContext.Provider>
  );
};

export default StudentVotingProvider;

export const StudentVotingContext = (): IStudentVotingContext => useContext(studentVotingContext);

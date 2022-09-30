import React, { createContext, useContext } from 'react';
import {
  IUseStudentVotingCreate,
  IUseStudentVotingGet,
  useStudentVotingCreate,
  useStudentVotingGet,
} from '../../hooks/PagesInStudents/usePageInStudents';

interface IStudentContext {
  getVoting: IUseStudentVotingGet | null;
  votingCreate: IUseStudentVotingCreate | null;
}

const defaultValue: IStudentContext = {
  getVoting: null,
  votingCreate: null,
};

export const studentContext = createContext<IStudentContext>(defaultValue);

const StudentProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getVoting = useStudentVotingGet();
  const votingCreate = useStudentVotingCreate();

  return (
    <studentContext.Provider value={{
      getVoting,
      votingCreate,
    }}
    >
      {children}
    </studentContext.Provider>
  );
};

export default StudentProvider;

export const StudentContext = (): IStudentContext => useContext(studentContext);

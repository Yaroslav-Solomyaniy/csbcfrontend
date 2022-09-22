import React, { createContext, useContext } from 'react';
import {
  IUseStudentVotingCreate,
  IUseStudentVotingGet,
  useStudentVotingCreate,
  useStudentVotingGet,
} from '../hooks/usePageInStudents';

interface IStudentContext {
  getVoting: IUseStudentVotingGet | null;
  votingCreate: IUseStudentVotingCreate | null;
}

const defaultValue: IStudentContext = {
  getVoting: null,
  votingCreate: null,
};

export const StudentContext = createContext<IStudentContext>(defaultValue);

const StudentProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getVoting = useStudentVotingGet();
  const votingCreate = useStudentVotingCreate();

  return (
    <StudentContext.Provider value={{
      getVoting,
      votingCreate,
    }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;

export const useStudentsContext = (): IStudentContext => useContext(StudentContext);

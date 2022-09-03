import React, { createContext, useContext, useEffect } from 'react';
import {
  IUseStudentCreate,
  IUseStudentDelete,
  IUseGetStudents,
  IUseGetStudentId,
  IUseStudentEdit,
  useStudentCreate,
  useStudentDelete,
  useStudentGetId,
  useStudentEdit,
  useGetStudents,
} from '../hooks/useStudents';
import { IUseGetListGroups, useGetListGroups } from '../hooks/useDropDown';
import { IUseStudentVotingGet, useStudentVotingGet } from '../hooks/usePageInStudents';
import { IUseCoursesGet, useCoursesGet } from '../hooks/useCourses';

interface IStudentContext {
  getVoting: IUseStudentVotingGet | null;
}

const defaultValue: IStudentContext = {
  getVoting: null,
};

export const StudentContext = createContext<IStudentContext>(defaultValue);

const StudentProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getVoting = useStudentVotingGet();

  return (
    <StudentContext.Provider value={{
      getVoting,
    }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;

export const useStudentsContext = (): IStudentContext => useContext(StudentContext);

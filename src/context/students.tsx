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

interface IStudentsContext {
  getStudents: IUseGetStudents | null;
  studentCreate: IUseStudentCreate | null;
  getStudentById: IUseGetStudentId | null;
  studentEdit: IUseStudentEdit | null;
  studentDelete: IUseStudentDelete | null;
}

const defaultValue: IStudentsContext = {
  getStudents: null,
  studentCreate: null,
  getStudentById: null,
  studentEdit: null,
  studentDelete: null,
};

export const StudentsContext = createContext<IStudentsContext>(defaultValue);

const StudentsProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getStudents = useGetStudents();
  const studentCreate = useStudentCreate();
  const getStudentById = useStudentGetId();
  const studentEdit = useStudentEdit();
  const studentDelete = useStudentDelete();

  return (
    <StudentsContext.Provider value={{
      getStudents,
      studentCreate,
      getStudentById,
      studentEdit,
      studentDelete,
    }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;

export const useStudentsContext = (): IStudentsContext => useContext(StudentsContext);

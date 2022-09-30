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
} from '../../hooks/PagesInAdmin/useStudents';

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

export const studentsContext = createContext<IStudentsContext>(defaultValue);

const StudentsProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getStudents = useGetStudents();
  const studentCreate = useStudentCreate();
  const getStudentById = useStudentGetId();
  const studentEdit = useStudentEdit();
  const studentDelete = useStudentDelete();

  return (
    <studentsContext.Provider value={{
      getStudents,
      studentCreate,
      getStudentById,
      studentEdit,
      studentDelete,
    }}
    >
      {children}
    </studentsContext.Provider>
  );
};

export default StudentsProvider;

export const StudentsContext = (): IStudentsContext => useContext(studentsContext);

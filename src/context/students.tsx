import React, { createContext, useContext, useEffect } from 'react';
import {
  ICreateStudents,
  IUseDeleteStudentsItem,
  IUseGetStudents,
  IUseGetStudentsItem,
  IUsePatchStudentsItem,
  useStudentCreate,
  useStudentDelete,
  useStudentGetId,
  useStudentPatch,
  useStudentsGet,
} from '../hooks/useStudents';

interface IStudentsContext {
  createStudents: ICreateStudents | null;
  getStudents: IUseGetStudents | null;
  getStudent: IUseGetStudentsItem | null;
  patchStudentsItem: IUsePatchStudentsItem | null;
  deleteStudentsItem: IUseDeleteStudentsItem | null;
}

const defaultValue: IStudentsContext = {
  createStudents: null,
  getStudents: null,
  getStudent: null,
  patchStudentsItem: null,
  deleteStudentsItem: null,
};

export const StudentsContext = createContext<IStudentsContext>(defaultValue);

const StudentsProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const createStudents = useStudentCreate();
  const getStudents = useStudentsGet();
  const getStudent = useStudentGetId();
  const patchStudentsItem = useStudentPatch();
  const deleteStudentsItem = useStudentDelete();

  useEffect(() => {
    getStudents.getStudent({});
  }, []);

  return (
    <StudentsContext.Provider value={{
      createStudents,
      getStudents,
      getStudent,
      patchStudentsItem,
      deleteStudentsItem,
    }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;

export const useStudentsContext = (): IStudentsContext => useContext(StudentsContext);

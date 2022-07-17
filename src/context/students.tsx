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
import { IUseGetListGroups, useGetListGroups } from '../hooks/useDropDown';

interface IStudentsContext {
  getOptionsGroups: IUseGetListGroups | null;
  createStudents: ICreateStudents | null;
  getStudents: IUseGetStudents | null;
  getStudent: IUseGetStudentsItem | null;
  patchStudentsItem: IUsePatchStudentsItem | null;
  deleteStudentsItem: IUseDeleteStudentsItem | null;
}

const defaultValue: IStudentsContext = {
  getOptionsGroups: null,
  createStudents: null,
  getStudents: null,
  getStudent: null,
  patchStudentsItem: null,
  deleteStudentsItem: null,
};

export const StudentsContext = createContext<IStudentsContext>(defaultValue);

const StudentsProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getOptionsGroups = useGetListGroups();
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
      getOptionsGroups,
      getStudents,
      getStudent,
      createStudents,
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

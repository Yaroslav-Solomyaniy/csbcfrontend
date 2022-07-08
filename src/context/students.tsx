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
import { IUseGetOptionsGroups, useGetOptionsGroups } from '../hooks/useGroups';

interface IStudentsContext {
  getOptionsGroups: IUseGetOptionsGroups | null;
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
  const getOptionsGroups = useGetOptionsGroups();
  const createStudents = useStudentCreate();
  const getStudents = useStudentsGet();
  const getStudent = useStudentGetId();
  const patchStudentsItem = useStudentPatch();
  const deleteStudentsItem = useStudentDelete();

  useEffect(() => {
    getStudents?.getStudent({});
  }, [createStudents?.data, patchStudentsItem?.data, deleteStudentsItem?.data]);

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

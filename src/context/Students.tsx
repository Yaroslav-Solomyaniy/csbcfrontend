import React, { createContext, useContext } from 'react';
import {
  ICreateStudents,
  IUseDeleteStudentsItem,
  IUseGetStudents,
  IUseGetStudentsItem,
  IUsePatchStudentsItem,
  useCreateStudents,
  useDeleteStudentsItem,
  useGetStudent,
  useGetStudents,
  usePatchStudentsItem,
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
  const createStudents = useCreateStudents();
  const getStudents = useGetStudents();
  const getStudent = useGetStudent();
  const patchStudentsItem = usePatchStudentsItem();
  const deleteStudentsItem = useDeleteStudentsItem();

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

export const useAuthContext = (): IStudentsContext => useContext(StudentsContext);

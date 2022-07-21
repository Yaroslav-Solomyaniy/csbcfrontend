import React, { createContext, useContext } from 'react';
import { useTeacherGet } from '../hooks/useTeachers';

interface IStudentsContext {

}

const defaultValue: IStudentsContext = {};

export const StudentsContext = createContext<IStudentsContext>(defaultValue);

const StudentsProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getTeacher = useTeacherGet();

  return (
    <StudentsContext.Provider value={{}}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;

export const useStudentsContext = (): IStudentsContext => useContext(StudentsContext);

import React, { createContext, useContext } from 'react';
import { IUseTeachersGet, useTeacherGet } from '../hooks/useTeachers';

interface ITeachersContext {
  getTeacher: IUseTeachersGet | null;
}

const defaultValue: ITeachersContext = {
  getTeacher: null,
};

export const TeachersContext = createContext<ITeachersContext>(defaultValue);

const TeachersProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getTeacher = useTeacherGet();

  return (
    <TeachersContext.Provider value={{ getTeacher }}>
      {children}
    </TeachersContext.Provider>
  );
};

export default TeachersProvider;

export const useTeachersContext = (): ITeachersContext => useContext(TeachersContext);

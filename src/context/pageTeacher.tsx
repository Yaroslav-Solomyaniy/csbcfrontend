import React, { createContext, useContext, useEffect } from 'react';
import { IUsePageTeacherGet, UsePageTeacherGet } from '../hooks/usePageTeacher';

interface ITeacherPageContext {
  teacherDataGet: IUsePageTeacherGet | null;
}

const defaultValue: ITeacherPageContext = {
  teacherDataGet: null,
};

export const TeacherPageContext = createContext<ITeacherPageContext>(defaultValue);

const TeacherPageProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const teacherDataGet = UsePageTeacherGet();

  return (
    <TeacherPageContext.Provider value={{
      teacherDataGet,
    }}
    >
      {children}
    </TeacherPageContext.Provider>
  );
};

export default TeacherPageProvider;

export const useTeacherPageContext = (): ITeacherPageContext => useContext(TeacherPageContext);

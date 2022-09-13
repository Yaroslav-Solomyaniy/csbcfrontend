import React, { createContext, useContext } from 'react';
import {
  IUsePageTeacherGet,
  IUsePageTeacherGetById, IUseTeacherPageEditRating,
  UsePageTeacherGet,
  UsePageTeacherGetById, useTeacherPageEditRating,
} from '../hooks/usePageTeacher';
import { IUseGetHistoryGrades, useGetHistoryGrades } from '../hooks/useGradesHistory';

interface ITeacherPageContext {
  teacherDataGet: IUsePageTeacherGet | null;
  teacherDataGetById: IUsePageTeacherGetById | null;
  teacherEditRating: IUseTeacherPageEditRating | null;
  getHistory: IUseGetHistoryGrades | null;
}

const defaultValue: ITeacherPageContext = {
  teacherDataGet: null,
  teacherDataGetById: null,
  teacherEditRating: null,
  getHistory: null,
};

export const TeacherPageContext = createContext<ITeacherPageContext>(defaultValue);

const TeacherPageProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const teacherDataGet = UsePageTeacherGet();
  const teacherDataGetById = UsePageTeacherGetById();
  const teacherEditRating = useTeacherPageEditRating();
  const getHistory = useGetHistoryGrades();

  return (
    <TeacherPageContext.Provider value={{
      teacherDataGetById,
      getHistory,
      teacherEditRating,
      teacherDataGet,
    }}
    >
      {children}
    </TeacherPageContext.Provider>
  );
};

export default TeacherPageProvider;

export const useTeacherPageContext = (): ITeacherPageContext => useContext(TeacherPageContext);

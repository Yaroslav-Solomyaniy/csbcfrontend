import React, { createContext, useContext } from 'react';
import {
  IUsePageTeacherGet,
  IUsePageTeacherGetById, IUseTeacherPageEditRating,
  UsePageTeacherGet,
  UsePageTeacherGetById, useTeacherPageEditRating,
} from '../../hooks/PageInTeacher/useTeacher';
import { IUseGetHistoryGrades, useGetHistoryGrades } from '../../hooks/All/useGradesHistory';

interface ITeacherContext {
  teacherDataGet: IUsePageTeacherGet | null;
  teacherDataGetById: IUsePageTeacherGetById | null;
  teacherEditRating: IUseTeacherPageEditRating | null;
  getHistory: IUseGetHistoryGrades | null;
}

const defaultValue: ITeacherContext = {
  teacherDataGet: null,
  teacherDataGetById: null,
  teacherEditRating: null,
  getHistory: null,
};

export const teacherContext = createContext<ITeacherContext>(defaultValue);

const TeacherProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const teacherDataGet = UsePageTeacherGet();
  const teacherDataGetById = UsePageTeacherGetById();
  const teacherEditRating = useTeacherPageEditRating();
  const getHistory = useGetHistoryGrades();

  return (
    <teacherContext.Provider value={{
      teacherDataGetById,
      getHistory,
      teacherEditRating,
      teacherDataGet,
    }}
    >
      {children}
    </teacherContext.Provider>
  );
};

export default TeacherProvider;

export const TeacherContext = (): ITeacherContext => useContext(teacherContext);

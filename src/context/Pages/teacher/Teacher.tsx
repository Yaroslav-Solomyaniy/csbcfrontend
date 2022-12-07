import React, { createContext, useContext } from 'react';
import { IUseGetTeacher, useGetTeacher } from '../../../hooks/api/teacher/useGet';
import { IUseGetTeacherById, useGetTeacherById } from '../../../hooks/api/teacher/useGetById';
import { IUseEditTeacherGrade, useEditTeacherGrade } from '../../../hooks/api/teacher/useEdit';
import { IUseGetHistoryGrades, useGetHistoryGrades } from '../../../hooks/api/all/useGradesHistory';

interface ITeacherContext {
  getTeacher: IUseGetTeacher | null;
  getTeacherById: IUseGetTeacherById | null;
  editGrade: IUseEditTeacherGrade | null;
  historyGrade: IUseGetHistoryGrades | null;
}

const defaultValue: ITeacherContext = {
  getTeacher: null,
  getTeacherById: null,
  editGrade: null,
  historyGrade: null,
};

export const teacherContext = createContext<ITeacherContext>(defaultValue);

const TeacherProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getTeacher = useGetTeacher();
  const getTeacherById = useGetTeacherById();
  const editGrade = useEditTeacherGrade();
  const historyGrade = useGetHistoryGrades();

  return (
    <teacherContext.Provider value={{ getTeacher, getTeacherById, editGrade, historyGrade }}>
      {children}
    </teacherContext.Provider>
  );
};

export default TeacherProvider;

export const TeacherContext = (): ITeacherContext => useContext(teacherContext);

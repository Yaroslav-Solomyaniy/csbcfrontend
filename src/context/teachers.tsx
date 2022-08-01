import React, { createContext, useContext } from 'react';
import {
  IUseDeleteTeacher,
  IUsePatchTeacher,
  IUseTeachersGet,
  useDeleteTeacher,
  useTeacherGet,
  useTeacherPatch,
} from '../hooks/useTeachers';

interface ITeachersContext {
  getTeacher: IUseTeachersGet | null;
  patchTeacher: IUsePatchTeacher | null;
  deleteTeacher: IUseDeleteTeacher | null;
}

const defaultValue: ITeachersContext = {
  getTeacher: null,
  patchTeacher: null,
  deleteTeacher: null,
};

export const TeachersContext = createContext<ITeachersContext>(defaultValue);

const TeachersProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getTeacher = useTeacherGet();
  const patchTeacher = useTeacherPatch();
  const deleteTeacher = useDeleteTeacher();

  return (
    <TeachersContext.Provider value={{ getTeacher, patchTeacher, deleteTeacher }}>
      {children}
    </TeachersContext.Provider>
  );
};

export default TeachersProvider;

export const useTeachersContext = (): ITeachersContext => useContext(TeachersContext);

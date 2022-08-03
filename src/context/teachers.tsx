import React, { createContext, useContext } from 'react';
import { IUsePatchTeacher, IUseTeachersGet, useTeacherGet, useTeacherPatch } from '../hooks/useTeachers';
import { IUseUserDelete, useUserDelete } from '../hooks/useUser';

interface ITeachersContext {
  getTeacher: IUseTeachersGet | null;
  patchTeacher: IUsePatchTeacher | null;
  deleteTeacher: IUseUserDelete | null;
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
  const deleteTeacher = useUserDelete();

  return (
    <TeachersContext.Provider value={{ getTeacher, patchTeacher, deleteTeacher }}>
      {children}
    </TeachersContext.Provider>
  );
};

export default TeachersProvider;

export const useTeachersContext = (): ITeachersContext => useContext(TeachersContext);

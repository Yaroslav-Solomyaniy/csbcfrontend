import React, { createContext, useContext } from 'react';
import {
  IUsePatchTeacher,
  IUseTeacherCreate,
  IUseTeachersGet,
  IUseTeachersGetId,
  useCreateTeacher,
  useTeacherGet,
  useTeacherGetId,
  useTeacherPatch,
} from '../hooks/useTeachers';
import { IUseUserDelete, useUserDelete } from '../hooks/useUser';

interface ITeachersContext {
  createTeacher: IUseTeacherCreate | null;
  getTeacher: IUseTeachersGet | null;
  patchTeacher: IUsePatchTeacher | null;
  deleteTeacher: IUseUserDelete | null;
  getTeacherId: IUseTeachersGetId | null;
}

const defaultValue: ITeachersContext = {
  createTeacher: null,
  getTeacher: null,
  getTeacherId: null,
  patchTeacher: null,
  deleteTeacher: null,
};

export const TeachersContext = createContext<ITeachersContext>(defaultValue);

const TeachersProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const createTeacher = useCreateTeacher();
  const getTeacher = useTeacherGet();
  const getTeacherId = useTeacherGetId();
  const patchTeacher = useTeacherPatch();
  const deleteTeacher = useUserDelete();

  return (
    <TeachersContext.Provider value={{ createTeacher, getTeacher, patchTeacher, deleteTeacher, getTeacherId }}>
      {children}
    </TeachersContext.Provider>
  );
};

export default TeachersProvider;

export const useTeachersContext = (): ITeachersContext => useContext(TeachersContext);

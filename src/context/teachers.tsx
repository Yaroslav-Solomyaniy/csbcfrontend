import React, { createContext, useContext } from 'react';
import {
  IUseTeachersGet,
  useTeacherGet,
} from '../hooks/useTeachers';
import {
  IUseUserCreate,
  IUseUserDelete,
  IUseUserEdit,
  IUseUserGetId,
  useUserCreate,
  useUserDelete, useUserEdit, useUserGetId,
} from '../hooks/useUser';

interface ITeachersContext {
  teachersGet: IUseTeachersGet | null;
  teacherCreate: IUseUserCreate | null;
  getTeacherById: IUseUserGetId | null;
  teacherEdit: IUseUserEdit | null;
  teacherDelete: IUseUserDelete | null;
}

const defaultValue: ITeachersContext = {
  teachersGet: null,
  teacherCreate: null,
  getTeacherById: null,
  teacherEdit: null,
  teacherDelete: null,
};

export const TeachersContext = createContext<ITeachersContext>(defaultValue);

const TeachersProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const teachersGet = useTeacherGet();
  const teacherCreate = useUserCreate();
  const teacherGetId = useUserGetId();
  const teacherEdit = useUserEdit();
  const teacherDelete = useUserDelete();

  return (
    <TeachersContext.Provider value={
      {
        teachersGet,
        teacherCreate,
        getTeacherById: teacherGetId,
        teacherEdit,
        teacherDelete }
}
    >
      {children}
    </TeachersContext.Provider>
  );
};

export default TeachersProvider;

export const useTeachersContext = (): ITeachersContext => useContext(TeachersContext);

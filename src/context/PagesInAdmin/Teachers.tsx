import React, { createContext, useContext } from 'react';
import {
  IUseTeachersGet,
  useTeacherGet,
} from '../../hooks/PagesInAdmin/useTeachers';
import {
  IUseUserCreate,
  IUseUserDelete,
  IUseUserEdit,
  IUseUserGetId,
  useUserCreate,
  useUserDelete, useUserEdit, useUserGetId,
} from '../../hooks/All/useUser';

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

export const teachersContext = createContext<ITeachersContext>(defaultValue);

const TeachersProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const teachersGet = useTeacherGet();
  const teacherCreate = useUserCreate();
  const teacherGetId = useUserGetId();
  const teacherEdit = useUserEdit();
  const teacherDelete = useUserDelete();

  return (
    <teachersContext.Provider value={
      {
        teachersGet,
        teacherCreate,
        getTeacherById: teacherGetId,
        teacherEdit,
        teacherDelete }
}
    >
      {children}
    </teachersContext.Provider>
  );
};

export default TeachersProvider;

export const TeachersContext = (): ITeachersContext => useContext(teachersContext);

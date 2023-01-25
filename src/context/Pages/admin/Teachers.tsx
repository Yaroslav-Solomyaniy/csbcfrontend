import React, { createContext, useContext } from 'react';
import { IUseGetTeachers, useGetTeachers } from '../../../hooks/api/admin/teachers/useGet';
import { IUseCreateUser, useCreateUser } from '../../../hooks/api/user/useCreate';
import { IUseGetUserById, useGetUserById } from '../../../hooks/api/user/useGetById';
import { IUseEditUser, useEditUser } from '../../../hooks/api/user/useEdit';
import { IUseDeleteUser, useDeleteUser } from '../../../hooks/api/user/useDelete';

interface ITeachersContext {
  getTeachers: IUseGetTeachers | null;
  createTeacher: IUseCreateUser | null;
  getTeacherById: IUseGetUserById | null;
  editTeacher: IUseEditUser | null;
  deleteTeacher: IUseDeleteUser | null;
}

const defaultValue: ITeachersContext = {
  getTeachers: null,
  createTeacher: null,
  getTeacherById: null,
  editTeacher: null,
  deleteTeacher: null,
};

export const teachersContext = createContext<ITeachersContext>(defaultValue);

const TeachersProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getTeachers = useGetTeachers();
  const createTeacher = useCreateUser();
  const getTeacherById = useGetUserById();
  const editTeacher = useEditUser();
  const deleteTeacher = useDeleteUser();

  return (
    <teachersContext.Provider value={{ getTeachers, createTeacher, getTeacherById, editTeacher, deleteTeacher }}>
      {children}
    </teachersContext.Provider>
  );
};

export default TeachersProvider;

export const TeachersContext = (): ITeachersContext => useContext(teachersContext);

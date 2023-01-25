import React, { createContext, useContext } from 'react';
import { IUseGetUser, useGetUser } from '../../../hooks/api/user/useGet';
import { IUseCreateUser, useCreateUser } from '../../../hooks/api/user/useCreate';
import { IUseGetUserById, useGetUserById } from '../../../hooks/api/user/useGetById';
import { IUseEditUser, useEditUser } from '../../../hooks/api/user/useEdit';
import { IUseDeleteUser, useDeleteUser } from '../../../hooks/api/user/useDelete';

interface IAdminContext {
  getAdmins: IUseGetUser | null;
  createAdmin: IUseCreateUser | null;
  getAdminById: IUseGetUserById | null;
  editAdmin: IUseEditUser | null;
  deleteAdmin: IUseDeleteUser | null;
}

const defaultValue: IAdminContext = {
  getAdmins: null,
  createAdmin: null,
  getAdminById: null,
  editAdmin: null,
  deleteAdmin: null,
};

export const adminsContext = createContext<IAdminContext>(defaultValue);

const AdministratorsProvider: React.FC = ({ children }): JSX.Element => {
  const getAdmins = useGetUser();
  const createAdmin = useCreateUser();
  const getAdminById = useGetUserById();
  const editAdmin = useEditUser();
  const deleteAdmin = useDeleteUser();

  return (
    <adminsContext.Provider
      value={{ getAdminById, getAdmins, createAdmin, editAdmin, deleteAdmin }}
    >
      {children}
    </adminsContext.Provider>
  );
};

export default AdministratorsProvider;

export const AdministratorsContext = (): IAdminContext => useContext(adminsContext);

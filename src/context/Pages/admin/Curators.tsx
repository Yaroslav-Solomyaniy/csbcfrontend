import React, { createContext, useContext } from 'react';
import { IUseGetCurators, useGetCurators } from '../../../hooks/api/admin/curators/useGet';
import { IUseCreateUser, useCreateUser } from '../../../hooks/api/user/useCreate';
import { IUseDeleteUser, useDeleteUser } from '../../../hooks/api/user/useDelete';
import { IUseEditUser, useEditUser } from '../../../hooks/api/user/useEdit';
import { IUseGetUserById, useGetUserById } from '../../../hooks/api/user/useGetById';

interface ICuratorsContext {
  getCurators: IUseGetCurators | null;
  createCurator: IUseCreateUser | null;
  getCuratorById: IUseGetUserById | null;
  editCurator: IUseEditUser | null;
  deleteCurator: IUseDeleteUser | null;
}

const defaultValue: ICuratorsContext = {
  getCurators: null,
  createCurator: null,
  getCuratorById: null,
  editCurator: null,
  deleteCurator: null,
};

export const curatorsContext = createContext<ICuratorsContext>(defaultValue);

const CuratorsProvider: React.FC = ({ children }): JSX.Element => {
  const getCurators = useGetCurators();
  const createCurator = useCreateUser();
  const getCuratorById = useGetUserById();
  const editCurator = useEditUser();
  const deleteCurator = useDeleteUser();

  return (
    <curatorsContext.Provider
      value={{ getCurators, createCurator, getCuratorById, editCurator, deleteCurator }}
    >
      {children}
    </curatorsContext.Provider>
  );
};

export default CuratorsProvider;

export const CuratorContext = (): ICuratorsContext => useContext(curatorsContext);

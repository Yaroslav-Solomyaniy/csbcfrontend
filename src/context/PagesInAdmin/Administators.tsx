import React, { createContext, useContext } from 'react';
import {
  IUseUserCreate,
  IUseUserDelete,
  IUseUserEdit,
  IUseUserGet,
  IUseUserGetId,
  useUserCreate,
  useUserDelete,
  useUserEdit,
  useUserGet,
  useUserGetId,
} from '../../hooks/All/useUser';

interface IAdministratorsContext {
  getAdministrators: IUseUserGet | null;
  administratorsCreate: IUseUserCreate | null;
  getAdministratorsId: IUseUserGetId | null;
  administratorsEdit: IUseUserEdit | null;
  administratorsDelete: IUseUserDelete | null;
}

const defaultValue: IAdministratorsContext = {
  getAdministrators: null,
  administratorsCreate: null,
  getAdministratorsId: null,
  administratorsEdit: null,
  administratorsDelete: null,
};

export const administratorsContext = createContext<IAdministratorsContext>(defaultValue);

const AdministratorsProvider: React.FC = ({ children }): JSX.Element => {
  const getAdministrators = useUserGet();
  const administratorsCreate = useUserCreate();
  const getAdministratorsId = useUserGetId();
  const administratorsEdit = useUserEdit();
  const administratorsDelete = useUserDelete();

  return (
    <administratorsContext.Provider
      value={{ getAdministrators, administratorsCreate, getAdministratorsId, administratorsEdit, administratorsDelete }}
    >
      {children}
    </administratorsContext.Provider>
  );
};

export default AdministratorsProvider;

export const AdministratorsContext = (): IAdministratorsContext => useContext(administratorsContext);

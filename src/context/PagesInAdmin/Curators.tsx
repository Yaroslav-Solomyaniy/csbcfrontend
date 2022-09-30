import React, { createContext, useContext } from 'react';
import { IUseCuratorsGet, useCuratorsGet } from '../../hooks/PagesInAdmin/useCurators';
import {
  IUseUserCreate,
  IUseUserDelete,
  IUseUserEdit,
  IUseUserGetId,
  useUserCreate,
  useUserDelete,
  useUserEdit,
  useUserGetId,
} from '../../hooks/All/useUser';

interface ICuratorsContext {
  getCurators: IUseCuratorsGet | null;
  curatorCreate: IUseUserCreate | null;
  getCuratorId: IUseUserGetId | null;
  curatorEdit: IUseUserEdit | null;
  curatorDelete: IUseUserDelete | null;
}

const defaultValue: ICuratorsContext = {
  getCurators: null,
  curatorCreate: null,
  getCuratorId: null,
  curatorEdit: null,
  curatorDelete: null,
};

export const curatorsContext = createContext<ICuratorsContext>(defaultValue);

const CuratorsProvider: React.FC = ({ children }): JSX.Element => {
  const getCurators = useCuratorsGet();
  const curatorsCreate = useUserCreate();
  const getCuratorId = useUserGetId();
  const curatorEdit = useUserEdit();
  const curatorDelete = useUserDelete();

  return (
    <curatorsContext.Provider
      value={{ getCurators, getCuratorId, curatorCreate: curatorsCreate, curatorDelete, curatorEdit }}
    >
      {children}
    </curatorsContext.Provider>
  );
};

export default CuratorsProvider;

export const CuratorContext = (): ICuratorsContext => useContext(curatorsContext);

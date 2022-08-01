import React, { createContext, useContext } from 'react';
import { IUseCuratorsGet, useCuratorsGet } from '../hooks/useCurators';
import {
  IUseUserCreate,
  IUseUserDelete,
  IUseUserEdit,
  IUseUserGetId,
  useUserCreate,
  useUserDelete,
  useUserEdit,
  useUserGetId,
} from '../hooks/useUser';

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

export const CuratorsContext = createContext<ICuratorsContext>(defaultValue);

const CuratorsProvider: React.FC = ({ children }): JSX.Element => {
  const getCurators = useCuratorsGet();
  const curatorsCreate = useUserCreate();
  const getCuratorId = useUserGetId();
  const curatorEdit = useUserEdit();
  const curatorDelete = useUserDelete();

  return (
    <CuratorsContext.Provider
      value={{ getCurators, getCuratorId, curatorCreate: curatorsCreate, curatorDelete, curatorEdit }}
    >
      {children}
    </CuratorsContext.Provider>
  );
};

export default CuratorsProvider;

export const useCuratorContext = (): ICuratorsContext => useContext(CuratorsContext);

import React, { createContext, useContext } from 'react';
import {
  IUseCuratorCreate,
  IUseCuratorDelete,
  IUseCuratorEdit,
  IUseCuratorsGet,
  IUseGetCuratorId,
  useCuratorCreate,
  useCuratorDelete,
  useCuratorEdit,
  useCuratorsGet,
  useGetCuratorId,
} from '../hooks/useCurators';

interface ICuratorsContext {
  getCurators: IUseCuratorsGet | null;
  curatorCreate: IUseCuratorCreate | null;
  getCuratorId: IUseGetCuratorId | null;
  curatorEdit: IUseCuratorEdit | null;
  curatorDelete: IUseCuratorDelete | null;
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
  const curatorsCreate = useCuratorCreate();
  const getCuratorId = useGetCuratorId();
  const curatorEdit = useCuratorEdit();
  const curatorDelete = useCuratorDelete();

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

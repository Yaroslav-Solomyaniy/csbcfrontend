import React, { createContext, useContext } from 'react';
import { IUseGetCurator, useGetCurator } from '../../../hooks/api/curator/useGetCurator';
import { IUseGetStudentById, useGetStudentById } from '../../../hooks/api/admin/students/useGetById';

interface ICuratorPageContext {
  getCurator: IUseGetCurator | null;
  getCuratorStudentInfo: IUseGetStudentById | null;
}

const defaultValue: ICuratorPageContext = {
  getCurator: null,
  getCuratorStudentInfo: null,
};

export const curatorContext = createContext<ICuratorPageContext>(defaultValue);

const CuratorProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getCurator = useGetCurator();
  const getCuratorStudentInfo = useGetStudentById();

  return (
    <curatorContext.Provider
      value={{ getCurator, getCuratorStudentInfo }}
    >
      {children}
    </curatorContext.Provider>
  );
};

export default CuratorProvider;

export const CuratorContext = (): ICuratorPageContext => useContext(curatorContext);

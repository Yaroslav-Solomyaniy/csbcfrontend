import React, { createContext, useContext } from 'react';
import {
  IUseGradesHistoryGetId,
  useGradesHistoryGet,
} from '../../hooks/PagesInAdmin/useEstimates';
import { IUseGetCuratorPage, useGetCuratorPage } from '../../hooks/PageInCurator/CuratorPage';
import { IUseGetStudentId, useStudentGetId } from '../../hooks/PagesInAdmin/useStudents';

interface ICuratorPageContext {
  curatorGet: IUseGetCuratorPage | null;
  curatorGetHistory: IUseGradesHistoryGetId | null;
  curatorGetInfoStudent: IUseGetStudentId | null;
/*  curatorGetDownload: IUseGradesGet | null; */
}

const defaultValue: ICuratorPageContext = {
  curatorGet: null,
  curatorGetHistory: null,
  curatorGetInfoStudent: null,
  // curatorGetDownload: null,
};

export const curatorContext = createContext<ICuratorPageContext>(defaultValue);

const CuratorProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const curatorGet = useGetCuratorPage();
  const curatorGetHistory = useGradesHistoryGet();
  const curatorGetInfoStudent = useStudentGetId();
  // const gradesHistoryGet = useGradesHistoryGet();

  return (
    <curatorContext.Provider
      value={{ curatorGet, curatorGetHistory, curatorGetInfoStudent }}
    >
      {children}
    </curatorContext.Provider>
  );
};

export default CuratorProvider;

export const CuratorContext = (): ICuratorPageContext => useContext(curatorContext);

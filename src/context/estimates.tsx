import React, { createContext, useContext } from 'react';
import {
  IUseEstimatesEdit,
  IUseGradesGet,
  IUseGradesGetId,
  IUseGradesHistoryGetId,
  useGradesEdit,
  useGradesGet,
  useGradesGetId,
  useGradesHistoryGet,
} from '../hooks/useEstimates';

interface IEstimatesContext {
  gradesEdit: IUseEstimatesEdit | null;
  gradesGet: IUseGradesGet | null;
  gradesGetId: IUseGradesGetId | null;
  gradeshistoryGet: IUseGradesHistoryGetId | null;
}

const defaultValue: IEstimatesContext = {
  gradesEdit: null,
  gradesGet: null,
  gradesGetId: null,
  gradeshistoryGet: null,
};

export const TeachersContext = createContext<IEstimatesContext>(defaultValue);

const EstimatesProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const gradesEdit = useGradesEdit();
  const gradesGet = useGradesGet();
  const gradesGetId = useGradesGetId();
  const gradeshistoryGet = useGradesHistoryGet();

  return (
    <TeachersContext.Provider
      value={{ gradesGet, gradesGetId, gradesEdit, gradeshistoryGet }}
    >
      {children}
    </TeachersContext.Provider>
  );
};

export default EstimatesProvider;

export const useEstimatesContext = (): IEstimatesContext => useContext(TeachersContext);

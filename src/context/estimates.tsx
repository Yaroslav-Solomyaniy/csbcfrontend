import React, { createContext, useContext } from 'react';
import {
  IUseGradesEdit,
  IUseGradesGet,
  IUseGradesGetId, IUseGradesHistoryGetId,
  useGradesEdit,
  useGradesGet,
  useGradesGetId, useGradesHistoryGet,
} from '../hooks/useEstimates';

interface IEstimatesContext {
  gradesEdit: IUseGradesEdit | null;
  gradesGet: IUseGradesGet | null;
  gradesGetId: IUseGradesGetId | null;
  gradesHistoryGet: IUseGradesHistoryGetId | null;
}

const defaultValue: IEstimatesContext = {
  gradesEdit: null,
  gradesGet: null,
  gradesGetId: null,
  gradesHistoryGet: null,
};

export const TeachersContext = createContext<IEstimatesContext>(defaultValue);

const EstimatesProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const gradesEdit = useGradesEdit();
  const gradesGet = useGradesGet();
  const gradesGetId = useGradesGetId();
  const gradesHistoryGet = useGradesHistoryGet();

  return (
    <TeachersContext.Provider
      value={{ gradesGet, gradesGetId, gradesEdit, gradesHistoryGet }}
    >
      {children}
    </TeachersContext.Provider>
  );
};

export default EstimatesProvider;

export const useEstimatesContext = (): IEstimatesContext => useContext(TeachersContext);

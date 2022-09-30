import React, { createContext, useContext } from 'react';
import {
  IUseGradesEdit,
  IUseGradesGet,
  IUseGradesGetId, IUseGradesHistoryGetId,
  useGradesEdit,
  useGradesGet,
  useGradesGetId, useGradesHistoryGet,
} from '../../hooks/PagesInAdmin/useEstimates';

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

export const estimatesContext = createContext<IEstimatesContext>(defaultValue);

const EstimatesProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const gradesEdit = useGradesEdit();
  const gradesGet = useGradesGet();
  const gradesGetId = useGradesGetId();
  const gradesHistoryGet = useGradesHistoryGet();

  return (
    <estimatesContext.Provider
      value={{ gradesGet, gradesGetId, gradesEdit, gradesHistoryGet }}
    >
      {children}
    </estimatesContext.Provider>
  );
};

export default EstimatesProvider;

export const EstimatesContext = (): IEstimatesContext => useContext(estimatesContext);

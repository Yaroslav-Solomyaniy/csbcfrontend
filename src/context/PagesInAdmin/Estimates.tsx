import React, { createContext, useContext } from 'react';
import {
  IUseGradesEdit,
  IUseGradesGet,
  IUseGradesGetId,
  useGradesEdit,
  useGradesGet,
  useGradesGetId,
} from '../../hooks/PagesInAdmin/useEstimates';

interface IEstimatesContext {
  gradesEdit: IUseGradesEdit | null;
  gradesGet: IUseGradesGet | null;
  gradesGetId: IUseGradesGetId | null;
}

const defaultValue: IEstimatesContext = {
  gradesEdit: null,
  gradesGet: null,
  gradesGetId: null,
};

export const estimatesContext = createContext<IEstimatesContext>(defaultValue);

const EstimatesProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const gradesEdit = useGradesEdit();
  const gradesGet = useGradesGet();
  const gradesGetId = useGradesGetId();

  return (
    <estimatesContext.Provider
      value={{ gradesGet, gradesGetId, gradesEdit }}
    >
      {children}
    </estimatesContext.Provider>
  );
};

export default EstimatesProvider;

export const EstimatesContext = (): IEstimatesContext => useContext(estimatesContext);

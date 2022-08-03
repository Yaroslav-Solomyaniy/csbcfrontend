import React, { createContext, useContext } from 'react';
import {
  IUseGradesCreate,
  IUseGradesGet,
  IUseGradesGetId,
  useCreateGrades,
  useGradesGet,
  useGradesGetId,
} from '../hooks/useEstimates';

interface IEstimatesContext {
  estimatesCreate: IUseGradesCreate | null;
  estimatesGet: IUseGradesGet | null;
  estimatesGetId: IUseGradesGetId | null;
}

const defaultValue: IEstimatesContext = {
  estimatesCreate: null,
  estimatesGet: null,
  estimatesGetId: null,
};

export const TeachersContext = createContext<IEstimatesContext>(defaultValue);

const EstimatesProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const estimatesCreate = useCreateGrades();
  const estimatesGet = useGradesGet();
  const estimatesGetId = useGradesGetId();

  return (
    <TeachersContext.Provider value={{ estimatesCreate, estimatesGet, estimatesGetId }}>
      {children}
    </TeachersContext.Provider>
  );
};

export default EstimatesProvider;

export const useEstimatesContext = (): IEstimatesContext => useContext(TeachersContext);

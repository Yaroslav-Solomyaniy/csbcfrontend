import React, { createContext, useContext } from 'react';
import {
  IUseEstimatesEdit,
  IUseGradesCreate,
  IUseGradesGet,
  IUseGradesGetId,
  useCreateGrades,
  useEstimatesEdit,
  useGradesGet,
  useGradesGetId,
} from '../hooks/useEstimates';

interface IEstimatesContext {
  estimatesEdit: IUseEstimatesEdit | null;
  estimatesCreate: IUseGradesCreate | null;
  estimatesGet: IUseGradesGet | null;
  estimatesGetId: IUseGradesGetId | null;
}

const defaultValue: IEstimatesContext = {
  estimatesEdit: null,
  estimatesCreate: null,
  estimatesGet: null,
  estimatesGetId: null,
};

export const TeachersContext = createContext<IEstimatesContext>(defaultValue);

const EstimatesProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const estimatesEdit = useEstimatesEdit();
  const estimatesCreate = useCreateGrades();
  const estimatesGet = useGradesGet();
  const estimatesGetId = useGradesGetId();

  return (
    <TeachersContext.Provider value={{ estimatesCreate, estimatesGet, estimatesGetId, estimatesEdit }}>
      {children}
    </TeachersContext.Provider>
  );
};

export default EstimatesProvider;

export const useEstimatesContext = (): IEstimatesContext => useContext(TeachersContext);

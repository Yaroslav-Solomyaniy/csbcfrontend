import React, { createContext, useContext } from 'react';
import { IUseEditGrade, useEditGrade } from '../../../hooks/api/admin/grades/useEdit';
import { IUseGetGrades, useGetGrades } from '../../../hooks/api/admin/grades/useGet';
import { IUseGetGradesById, useGetGradesById } from '../../../hooks/api/admin/grades/useGetById';

interface IEstimatesContext {
  editGrade: IUseEditGrade | null;
  getGrades: IUseGetGrades | null;
  getGradesById: IUseGetGradesById | null;
}

const defaultValue: IEstimatesContext = {
  editGrade: null,
  getGrades: null,
  getGradesById: null,
};

export const estimatesContext = createContext<IEstimatesContext>(defaultValue);

const EstimatesProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const editGrade = useEditGrade();
  const getGrades = useGetGrades();
  const getGradesById = useGetGradesById();

  return (
    <estimatesContext.Provider
      value={{ editGrade, getGrades, getGradesById }}
    >
      {children}
    </estimatesContext.Provider>
  );
};

export default EstimatesProvider;

export const EstimatesContext = (): IEstimatesContext => useContext(estimatesContext);

import { createContext, useContext } from 'react';
import { IUseIndvPlanEdit, IUseIndvPlanGet, useIndvPlanEdit, useIndvPlanGet } from '../../hooks/IndividualPlan';
import { IUseIndividualPlanDownload, UseIndividualPlanDownload } from '../../hooks/PagesInStudents/usePageInStudents';

interface IIndvPlanContext {
  getPlan: IUseIndvPlanGet | null;
  editPlan: IUseIndvPlanEdit | null;
  download: IUseIndividualPlanDownload | null;
}

const defaultValue: IIndvPlanContext = {
  getPlan: null,
  editPlan: null,
  download: null,
};

export const individualPlanContext = createContext<IIndvPlanContext>(defaultValue);

const PlanProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getPlan = useIndvPlanGet();
  const editPlan = useIndvPlanEdit();
  const download = UseIndividualPlanDownload();

  return (
    <individualPlanContext.Provider
      value={{ getPlan, editPlan, download }}
    >
      {children}
    </individualPlanContext.Provider>
  );
};

export default PlanProvider;

export const IndividualPlanContext = (): IIndvPlanContext => useContext(individualPlanContext);

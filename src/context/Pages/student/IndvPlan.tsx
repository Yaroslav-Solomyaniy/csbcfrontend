import { createContext, useContext } from 'react';
import { IUseGetIndvPlan, useGetIndvPlan } from '../../../hooks/api/individualPlan/useGet';
import { IUseEditIndvPlan, useEditIndvPlan } from '../../../hooks/api/individualPlan/useEdit';
import { IUseDownloadPlan, useDownloadPlan } from '../../../hooks/api/student/useDownloadPlan';

interface IIndvPlanContext {
  getPlan: IUseGetIndvPlan | null;
  editPlan: IUseEditIndvPlan | null;
  download: IUseDownloadPlan | null;
}

const defaultValue: IIndvPlanContext = {
  getPlan: null,
  editPlan: null,
  download: null,
};

export const individualPlanContext = createContext<IIndvPlanContext>(defaultValue);

const PlanProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getPlan = useGetIndvPlan();
  const editPlan = useEditIndvPlan();
  const download = useDownloadPlan();

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

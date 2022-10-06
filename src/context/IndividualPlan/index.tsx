import { createContext, useContext } from 'react';
import { IUseIndvPlanEdit, IUseIndvPlanGet, useIndvPlanEdit, useIndvPlanGet } from '../../hooks/IndividualPlan';

interface IIndvPlanContext {
  getPlan: IUseIndvPlanGet | null;
  editPlan: IUseIndvPlanEdit | null;
}

const defaultValue: IIndvPlanContext = {
  getPlan: null,
  editPlan: null,
};

export const individualPlanContext = createContext<IIndvPlanContext>(defaultValue);

const PlanProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getPlan = useIndvPlanGet();
  const editPlan = useIndvPlanEdit();

  return (
    <individualPlanContext.Provider
      value={{ getPlan, editPlan }}
    >
      {children}
    </individualPlanContext.Provider>
  );
};

export default PlanProvider;

export const IndividualPlanContext = (): IIndvPlanContext => useContext(individualPlanContext);

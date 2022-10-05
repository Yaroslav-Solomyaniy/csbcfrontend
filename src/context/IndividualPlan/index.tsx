import { createContext, useContext } from 'react';
import { IUseIndvPlanGet, useIndvPlanGet } from '../../hooks/IndividualPlan';

interface IIndvPlanContext {
  getPlan: IUseIndvPlanGet | null;
}

const defaultValue: IIndvPlanContext = {
  getPlan: null,
};

export const individualPlanContext = createContext<IIndvPlanContext>(defaultValue);

const PlanProvider = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const getPlan = useIndvPlanGet();

  return (
    <individualPlanContext.Provider
      value={{ getPlan }}
    >
      {children}
    </individualPlanContext.Provider>
  );
};

export default PlanProvider;

export const IndividualPlanContext = (): IIndvPlanContext => useContext(individualPlanContext);

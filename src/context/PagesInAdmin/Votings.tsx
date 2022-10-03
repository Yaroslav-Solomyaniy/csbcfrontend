import React, { createContext, useContext } from 'react';
import {
  IUseVotingAdmCreate, IUseVotingDelete,
  IUseVotingEdit,
  IUseVotingGet, IUseVotingGetById, IUseVotingGetResultById, IUseVotingGetSubmitDataById, IUseVotingSubmit,
  useVotingCreate, useVotingDelete, useVotingEdit,
  useVotingGet, useVotingGetById, useVotingGetResultById, useVotingGetSubmitDataById, useVotingSubmit,
} from '../../hooks/PagesInAdmin/useVotings';

interface IVotingsContext {
  getVoting: IUseVotingGet | null;
  votingCreate: IUseVotingAdmCreate | null;
  votingEdit: IUseVotingEdit | null;
  votingGetById: IUseVotingGetById | null;
  votingDelete: IUseVotingDelete | null;
  votingResult: IUseVotingGetResultById | null;
  getVotingFormSubmit: IUseVotingGetSubmitDataById | null;
  votingSubmit: IUseVotingSubmit | null;
}

const defaultValue: IVotingsContext = {
  getVoting: null,
  votingCreate: null,
  votingEdit: null,
  votingGetById: null,
  votingDelete: null,
  votingResult: null,
  getVotingFormSubmit: null,
  votingSubmit: null,
};

export const votingsAdminContext = createContext<IVotingsContext>(defaultValue);

const VotingAdminProvider: React.FC = ({ children }): JSX.Element => {
  const getVoting = useVotingGet();
  const votingCreate = useVotingCreate();
  const votingEdit = useVotingEdit();
  const votingGetById = useVotingGetById();
  const votingDelete = useVotingDelete();
  const votingResult = useVotingGetResultById();
  const getVotingFormSubmit = useVotingGetSubmitDataById();
  const votingSubmit = useVotingSubmit();

  return (
    <votingsAdminContext.Provider
      value={{ getVoting,
        votingCreate,
        votingEdit,
        votingGetById,
        votingDelete,
        votingResult,
        getVotingFormSubmit,
        votingSubmit }}
    >
      {children}
    </votingsAdminContext.Provider>
  );
};

export default VotingAdminProvider;
export const VotingsAdmin = (): IVotingsContext => useContext(votingsAdminContext);

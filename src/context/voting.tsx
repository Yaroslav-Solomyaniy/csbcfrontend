import React, { createContext, useContext } from 'react';
import {
  IUseVotingAdmCreate, IUseVotingDelete,
  IUseVotingEdit,
  IUseVotingGet, IUseVotingGetById, IUseVotingGetResultById,
  useVotingCreate, useVotingDelete, useVotingEdit,
  useVotingGet, useVotingGetById, useVotingGetResultById,
} from '../hooks/useVotingAdmin';

interface IVotingContext {
  getVoting: IUseVotingGet | null;
  votingCreate: IUseVotingAdmCreate | null;
  votingEdit: IUseVotingEdit | null;
  votingGetById: IUseVotingGetById | null;
  votingDelete: IUseVotingDelete | null;
  votingResult: IUseVotingGetResultById | null;
}

const defaultValue: IVotingContext = {
  getVoting: null,
  votingCreate: null,
  votingEdit: null,
  votingGetById: null,
  votingDelete: null,
  votingResult: null,
};

export const VotingAdminContext = createContext<IVotingContext>(defaultValue);

const VotingAdminProvider: React.FC = ({ children }): JSX.Element => {
  const getVoting = useVotingGet();
  const votingCreate = useVotingCreate();
  const votingEdit = useVotingEdit();
  const votingGetById = useVotingGetById();
  const votingDelete = useVotingDelete();
  const votingResult = useVotingGetResultById();

  return (
    <VotingAdminContext.Provider
      value={{ getVoting, votingCreate, votingEdit, votingGetById, votingDelete, votingResult }}
    >
      {children}
    </VotingAdminContext.Provider>
  );
};

export default VotingAdminProvider;
export const useVotingAdminContext = (): IVotingContext => useContext(VotingAdminContext);

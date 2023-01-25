import React, { createContext, useContext } from 'react';
import { IUseGetVotingsAdmin, useGetVotingsAdmin } from '../../../hooks/api/admin/voting/useGet';
import { IUseCreateVotingAdmin, useCreateVotingAdmin } from '../../../hooks/api/admin/voting/useCreate';
import { IUseEditVoting, useEditVoting } from '../../../hooks/api/admin/voting/useEdit';
import { IUseGetVotingById, useGetVotingById } from '../../../hooks/api/admin/voting/useGetById';
import { IUseDeleteVoting, useDeleteVoting } from '../../../hooks/api/admin/voting/useDelete';
import {
  IUseGetVotingResultById,
  useGetVotingResultById,
} from '../../../hooks/api/admin/voting/useGetResult/useGetResult';
import {
  IUseGetVotingSubmitDataById, useGetVotingSubmitDataById,
} from '../../../hooks/api/admin/voting/useGetVotingSubmitById/useGetVotingSubmitDataById';
import { IUseSubmitVoting, useSubmitVoting } from '../../../hooks/api/admin/voting/useSubmit';

interface IVotingsContext {
  getVotings: IUseGetVotingsAdmin | null;
  createVoting: IUseCreateVotingAdmin | null;
  editVoting: IUseEditVoting | null;
  getVotingById: IUseGetVotingById | null;
  deleteVoting: IUseDeleteVoting | null;
  getResultVoting: IUseGetVotingResultById | null;
  getVotingFormSubmit: IUseGetVotingSubmitDataById | null;
  submitVoting: IUseSubmitVoting | null;
}

const defaultValue: IVotingsContext = {
  getVotings: null,
  createVoting: null,
  editVoting: null,
  getVotingById: null,
  deleteVoting: null,
  getResultVoting: null,
  getVotingFormSubmit: null,
  submitVoting: null,
};

export const votingsAdminContext = createContext<IVotingsContext>(defaultValue);

const VotingAdminProvider: React.FC = ({ children }): JSX.Element => {
  const getVotings = useGetVotingsAdmin();
  const createVoting = useCreateVotingAdmin();
  const editVoting = useEditVoting();
  const getVotingById = useGetVotingById();
  const deleteVoting = useDeleteVoting();
  const getResultVoting = useGetVotingResultById();
  const getVotingFormSubmit = useGetVotingSubmitDataById();
  const submitVoting = useSubmitVoting();

  return (
    <votingsAdminContext.Provider
      value={{ getVotings,
        createVoting,
        editVoting,
        getVotingById,
        deleteVoting,
        getResultVoting,
        getVotingFormSubmit,
        submitVoting }}
    >
      {children}
    </votingsAdminContext.Provider>
  );
};

export default VotingAdminProvider;
export const VotingsAdmin = (): IVotingsContext => useContext(votingsAdminContext);

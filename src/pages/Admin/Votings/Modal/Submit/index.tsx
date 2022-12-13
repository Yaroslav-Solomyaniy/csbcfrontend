import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { ISubmitVotingParams } from '../../../../../hooks/api/admin/voting/useSubmit';
import { VotingsAdmin } from '../../../../../context/Pages/admin/Votings';
import SubmitVotingForm from './SubmitForm';
import { MessagesContext } from '../../../../../context/All/Messages';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import {
  IGetVotingSubmitDataById,
} from '../../../../../hooks/api/admin/voting/useGetVotingSubmitById/IGetVotingSubmitDataById';

interface IVotingSubmitModal{
  modalActive: boolean;
  closeModal: () => void;
  votingId: number;
  changeWindow: (value: number) => void;
}

const VotingSubmitModal = ({ votingId, modalActive, closeModal, changeWindow }:IVotingSubmitModal) => {
  const [data, setData] = useState<IGetVotingSubmitDataById>();
  const [formData, setFormData] = useState<ISubmitVotingParams>({ courses: [] });
  const { getVotingFormSubmit, submitVoting } = VotingsAdmin();
  const { addInfo, addWarning } = MessagesContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData({ courses: [] });
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    if (formData.courses.length > 0) {
      submitVoting?.submitVoting(formData, votingId);
    }
  };

  useEffect(() => {
    if (submitVoting?.data) {
      handleClose();
      addWarning('Студентам які не проголосували, потрібно вручну обрати вибіркові предмети!');
      addInfo(`Вибіркові компетентності для груп:${data?.groups.map((item) => item.name).join(', ')} затверджені`);
    }
  }, [submitVoting?.data]);

  useEffect(() => {
    if (votingId) {
      getVotingFormSubmit?.getVotingSubmitDataById({ id: votingId });
    }
  }, [votingId]);

  useEffect(() => {
    if (getVotingFormSubmit?.data) {
      setData(getVotingFormSubmit.data);
    }
  }, [getVotingFormSubmit?.data]);

  return (
    <ModalWindow
      modalTitle={`Затвердження голосувань для груп:
       ${data?.groups.map((group) => group.name) || ''} від ${moment(data?.startDate).format('DD.MM.YYYY')}`}
      active={modalActive}
      closeModal={handleClose}
    >
      <SubmitVotingForm
        data={data}
        formData={formData.courses}
        onSubmit={onSubmit}
        setFormData={setFormData}
      />
      <ModalControlButtons
        handleClose={handleClose}
        cancelButtonText="Відміна"
        onSubmit={onSubmit}
        mainButtonText="Затвердити компетентності"
        isDisabled={formData.courses.length === 0}
        isRevoteButton
        changeWindow={changeWindow}
        votingId={votingId}
      />
    </ModalWindow>
  );
};

export default VotingSubmitModal;

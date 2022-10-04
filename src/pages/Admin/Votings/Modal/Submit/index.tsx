import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IGetVotingSubmitDataById, IVotingSubmitParams } from '../../../../../hooks/PagesInAdmin/useVotings';
import { VotingsAdmin } from '../../../../../context/PagesInAdmin/Votings';
import SubmitVotingForm from './SubmitForm';
import { MessagesContext } from '../../../../../context/All/Messages';

interface IVotingSubmitModal{
  modalActive: boolean;
  closeModal: () => void;
  votingId: number;
}

const VotingSubmitModal = ({ votingId, modalActive, closeModal }:IVotingSubmitModal) => {
  const [data, setData] = useState<IGetVotingSubmitDataById>();
  const [formData, setFormData] = useState<IVotingSubmitParams>({ courses: [0, 0, 0, 0] });
  const { getVotingFormSubmit, votingSubmit } = VotingsAdmin();
  const { addInfo } = MessagesContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData({ courses: [0, 0, 0, 0] });
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    if (!formData.courses.includes(0)) {
      votingSubmit?.votingSubmit(formData, votingId);
    }
  };

  useEffect(() => {
    if (votingSubmit?.data) {
      handleClose();
      addInfo(`Вибіркові компетентності для груп:${data?.groups.map((item) => item.name).join(', ')} затверджені`);
    }
  }, [votingSubmit?.data]);

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => (
    setFormData({ ...formData,
      courses: formData.courses.map((item, index) => (
        index === +e.target.name ? +e.currentTarget.value : item)),
    })
  );

  useEffect(() => {
    if (votingId) {
      getVotingFormSubmit?.votingGetSubmitDataById({ id: votingId });
    }
  }, [votingId]);

  useEffect(() => {
    if (getVotingFormSubmit?.data) {
      setData(getVotingFormSubmit.data);
    }
  }, [getVotingFormSubmit?.data]);

  return (
    <ModalWindow
      modalTitle={`Затвердження голосувань для груп: ${data?.groups.map(
        (group) => group.name,
      ) || ''} від ${moment(data?.startDate).format('DD.MM.YYYY')}`}
      active={modalActive}
      closeModal={handleClose}
    >
      <SubmitVotingForm
        data={data}
        formData={formData.courses}
        handleRadioClick={handleRadioClick}
        onSubmit={onSubmit}
        handleClose={handleClose}
      />
    </ModalWindow>
  );
};

export default VotingSubmitModal;

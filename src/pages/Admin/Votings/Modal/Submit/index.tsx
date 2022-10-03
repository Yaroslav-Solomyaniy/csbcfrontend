import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IGetVotingResultDataById } from '../../../../../hooks/PagesInAdmin/useVotings';
import VotingAdmin from '../../index';
import { VotingsAdmin } from '../../../../../context/PagesInAdmin/Votings';
import SubmitVotingForm from './SubmitForm';

interface IVotingSubmitModal{
  modalActive: boolean;
  closeModal: () => void;
  votingId: number;
}

const VotingSubmitModal = ({ votingId, modalActive, closeModal }:IVotingSubmitModal) => {
  const [data, setData] = useState<IGetVotingResultDataById>();

  const { votingResult } = VotingsAdmin();
  // const handleClose = () => {
  //   closeModal();
  //   setTimeout(() => {
  //     setData({});
  //   }, 200);
  // };

  useEffect(() => {
    if (votingId) {
      votingResult?.votingGetResultById({ id: votingId });
    }
  }, [votingId]);

  useEffect(() => {
    if (votingResult?.data) {
      setData(votingResult.data);
    }
  }, [votingResult?.data]);

  return (
    <ModalWindow
      modalTitle={`Затвердження голосувань для груп: ${data?.groups.map(
        (group) => group.name,
      ) || ''} від ${moment(data?.startDate).format('DD.MM.YYYY')}`}
      active={modalActive}
      closeModal={closeModal}
    >
      <SubmitVotingForm data={data} votingSubmitCourses={[]} onSubmit={() => console.log('hi')} />
    </ModalWindow>
  );
};

export default VotingSubmitModal;

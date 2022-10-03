import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IGetVotingSubmitDataById, IVotingSubmitParams } from '../../../../../hooks/PagesInAdmin/useVotings';
import { VotingsAdmin } from '../../../../../context/PagesInAdmin/Votings';
import SubmitVotingForm from './SubmitForm';

interface IVotingSubmitModal{
  modalActive: boolean;
  closeModal: () => void;
  votingId: number;
}

const VotingSubmitModal = ({ votingId, modalActive, closeModal }:IVotingSubmitModal) => {
  const [data, setData] = useState<IGetVotingSubmitDataById>();
  const [formData, setFormData] = useState<IVotingSubmitParams>({ id: 0, course: [0, 0, 0, 0] });
  const { getVotingFormSubmit } = VotingsAdmin();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData({ id: 0, course: [0, 0, 0, 0] });
    }, 200);
  };

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => (

    setFormData({ ...formData,
      course: formData.course.map((item, index) => (
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
        formData={formData.course}
        handleRadioClick={handleRadioClick}
        onSubmit={() => console.log('hi')}
      />
    </ModalWindow>
  );
};

export default VotingSubmitModal;

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { VotingsAdmin } from '../../../../../context/Pages/admin/Votings';
import ResultDisplay from './Components/ResultDisplay';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { IGetVotingResultDataById } from '../../../../../hooks/api/admin/voting/useGetResult/IGetVotingResultDataById';

const formInitialData: IGetVotingResultDataById = {
  id: 0,
  tookPart: 0,
  status: '',
  groups: [],
  students: [],
  startDate: '',
  courses: [],
};

interface IResultModal {
  modalActive: boolean;
  closeModal: () => void;
  votingId: number;
}

export const VotingResultModal = ({ modalActive, closeModal, votingId }: IResultModal): JSX.Element => {
  const [formData, setFormData] = useState(formInitialData);

  const { getResultVoting } = VotingsAdmin();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  useEffect(() => {
    if (votingId) {
      getResultVoting?.getVotingResultById({ id: votingId });
    }
  }, [votingId]);

  useEffect(() => {
    if (getResultVoting?.data) {
      setFormData({
        id: getResultVoting?.data.id,
        tookPart: getResultVoting?.data.tookPart,
        status: getResultVoting?.data.status,
        students: getResultVoting?.data.students,
        groups: getResultVoting?.data.groups,
        startDate: getResultVoting.data.startDate,
        courses: getResultVoting.data.courses,
      });
    }
  }, [getResultVoting?.data]);

  return (
    <ModalWindow
      modalTitle={`Результати голосування для
      ${formData.groups.map((item) => item.name).join(',')}
      від ${moment(formData.startDate).format('DD.MM.YYYY')}`}
      active={modalActive}
      closeModal={handleClose}
    >
      <ResultDisplay
        votingId={votingId}
        formData={formData}
      />
      <ModalControlButtons
        handleClose={handleClose}
        cancelButtonText="Назад"
      />
    </ModalWindow>
  );
};

export default VotingResultModal;

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IGetVotingResultDataById } from '../../../../../hooks/PagesInAdmin/useVotings';
import { VotingsAdmin } from '../../../../../context/PagesInAdmin/Votings';
import ResultDisplay from './Components/ResultDisplay';
import { DeviceContext } from '../../../../../context/All/DeviceType';

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
  changeWindow: (value: number) => void;
}

export const VotingResultModal = ({ modalActive, closeModal, votingId, changeWindow }: IResultModal): JSX.Element => {
  const [formData, setFormData] = useState(formInitialData);

  const { votingResult } = VotingsAdmin();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  useEffect(() => {
    if (votingId) {
      votingResult?.votingGetResultById({ id: votingId });
    }
  }, [votingId]);

  useEffect(() => {
    if (votingResult?.data) {
      setFormData({
        id: votingResult?.data.id,
        tookPart: votingResult?.data.tookPart,
        status: votingResult?.data.status,
        students: votingResult?.data.students,
        groups: votingResult?.data.groups,
        startDate: votingResult.data.startDate,
        courses: votingResult.data.courses,
      });
    }
  }, [votingResult?.data]);

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
        changeWindow={changeWindow}
        handleClose={handleClose}
      />
    </ModalWindow>
  );
};

export default VotingResultModal;

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IGetVotingResultDataById } from '../../../../../hooks/useVotingAdmin';
import { useVotingAdminContext } from '../../../../../context/voting';
import ResultDisplay from './Components/ResultDisplay';
import { useDeviceContext } from '../../../../../context/TypeDevice';
import MobileModalWindow from '../../../../../components/common/MobileModalWindow';

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

  const { votingResult } = useVotingAdminContext();
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  useEffect(() => {
    if (votingId) {
      votingResult?.votingGetResultById({ id: `${votingId}` });
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
    <>
      {isDesktop && (
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
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <ResultDisplay
            votingId={votingId}
            formData={formData}
            changeWindow={changeWindow}
            handleClose={handleClose}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default VotingResultModal;

import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IGetVotingSubmitDataById, IVotingSubmitParams } from '../../../../../hooks/PagesInAdmin/useVotings';
import { VotingsAdmin } from '../../../../../context/PagesInAdmin/Votings';
import SubmitVotingForm from './SubmitForm';
import { MessagesContext } from '../../../../../context/All/Messages';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import styles from './index.module.scss';
import Button from '../../../../../components/common/Button';

interface IVotingSubmitModal{
  modalActive: boolean;
  closeModal: () => void;
  votingId: number;
  changeWindow: (value: number) => void;
}

const VotingSubmitModal = ({ votingId, modalActive, closeModal, changeWindow }:IVotingSubmitModal) => {
  const [data, setData] = useState<IGetVotingSubmitDataById>();
  const [formData, setFormData] = useState<IVotingSubmitParams>({ courses: [] });
  const { getVotingFormSubmit, votingSubmit } = VotingsAdmin();
  const { addInfo } = MessagesContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData({ courses: [] });
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    if (formData.courses.length > 0) {
      votingSubmit?.votingSubmit(formData, votingId);
    }
  };

  useEffect(() => {
    if (votingSubmit?.data) {
      handleClose();
      addInfo(`Вибіркові компетентності для груп:${data?.groups.map((item) => item.name).join(', ')} затверджені`);
    }
  }, [votingSubmit?.data]);

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
        onSubmit={onSubmit}
        setFormData={setFormData}
      />
      <div className={styles.buttons}>
        <ModalControlButtons
          handleClose={handleClose}
          cancelButtonText="Відміна"
          onSubmit={onSubmit}
          mainButtonText="Затвердити компетентності"
          isDisabled={formData.courses.length === 0}
        />
        <Button
          onClick={() => changeWindow(votingId)}
          size="small"
          nameClass="primary"
          className={styles.buttonCreateRevoting}
        >
          Створити переголосування
        </Button>

      </div>
    </ModalWindow>
  );
};

export default VotingSubmitModal;

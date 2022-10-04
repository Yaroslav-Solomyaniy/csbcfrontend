import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IDeleteModal } from '../../../../../types';
import { MessagesContext } from '../../../../../context/All/Messages';
import { VotingsAdmin } from '../../../../../context/PagesInAdmin/Votings';
import FormDeleteVoting from './formDeleteVoting';

export const VotingDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [groups, setGroups] = useState<string[]>([]);
  const { votingGetById, votingDelete } = VotingsAdmin();
  const { addInfo } = MessagesContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setGroups([]);
    }, 200);
  };

  useEffect(() => {
    if (Id) {
      votingGetById?.getVotingById({ id: `${Id}` });
    }
  }, [Id]);

  useEffect(() => {
    if (votingGetById?.data) {
      setGroups(votingGetById.data.groups.map((group) => group.name));
    }
  }, [votingGetById?.data]);

  useEffect(() => {
    if (votingDelete?.data) {
      handleClose();
      addInfo(`Голосування для груп ${groups.map((group) => group).join(',')} видалене`);
    }
  }, [votingDelete?.data]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    votingDelete?.votingDelete(Id);
  };

  return (
    <ModalWindow modalTitle="Видалення голосування" active={modalActive} closeModal={handleClose}>
      <FormDeleteVoting
        handleClose={handleClose}
        groups={groups}
        onSubmit={onSubmit}
      />
    </ModalWindow>
  );
};

export default VotingDeleteModal;
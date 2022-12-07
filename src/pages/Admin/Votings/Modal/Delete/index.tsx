import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IDeleteModal } from '../../../../../types';
import { MessagesContext } from '../../../../../context/All/Messages';
import { VotingsAdmin } from '../../../../../context/Pages/admin/Votings';
import styles from '../../../../pagesStyle.module.scss';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

export const VotingDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [groups, setGroups] = useState<string[]>([]);
  const { getVotingById, deleteVoting } = VotingsAdmin();
  const { addInfo } = MessagesContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setGroups([]);
    }, 200);
  };

  useEffect(() => {
    if (Id) {
      getVotingById?.getVotingById({ id: `${Id}` });
    }
  }, [Id]);

  useEffect(() => {
    if (getVotingById?.data) {
      setGroups(getVotingById.data.groups.map((group) => group.name));
    }
  }, [getVotingById?.data]);

  useEffect(() => {
    if (deleteVoting?.data) {
      handleClose();
      addInfo(`Голосування для груп ${groups.map((group) => group).join(',')} видалене`);
    }
  }, [deleteVoting?.data]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    deleteVoting?.deleteVoting(Id);
  };

  return (
    <ModalWindow modalTitle="Видалення голосування" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.subtitle}>
          {`Ви дійсно бажаєте видалити голосування для груп: "${groups.map((group) => group).join(',')}" ?`}
        </h3>
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Видалити"
      />
    </ModalWindow>
  );
};

export default VotingDeleteModal;

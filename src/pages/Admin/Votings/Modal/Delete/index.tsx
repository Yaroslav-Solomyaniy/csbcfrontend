import React, { useEffect, useState } from 'react';
import pagesStyle from '../../../../pagesStyle.module.scss';
import ModalWindow from '../../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { IDeleteModal } from '../../../../../types';
import { useMessagesContext } from '../../../../../context/messagesContext';
import { useVotingAdminContext } from '../../../../../context/voting';
import CreateEditRevoteFormVotingAdmin from '../form/CreateEditRevoteFormVotingAdmin';
import MobileModalWindow from '../../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../../context/TypeDevice';
import FormDeleteVoting from './formDeleteVoting';

export const VotingDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [groups, setGroups] = useState<string[]>([]);
  const { votingGetById, votingDelete } = useVotingAdminContext();
  const { addInfo } = useMessagesContext();
  const { isPhone, isDesktop, isTablet } = useDeviceContext();

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
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Видалення голосування" active={modalActive} closeModal={handleClose}>
          <FormDeleteVoting
            handleClose={handleClose}
            groups={groups}
            onSubmit={onSubmit}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <FormDeleteVoting
            modalTitle="Видалення голосування"
            handleClose={handleClose}
            groups={groups}
            onSubmit={onSubmit}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default VotingDeleteModal;

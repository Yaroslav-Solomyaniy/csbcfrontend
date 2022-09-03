import React, { useEffect, useState } from 'react';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IDeleteModal } from '../../../types';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { useAdministratorsContext } from '../../../context/administators';
import { useVotingAdminContext } from '../../../context/voting';

const formInitialData = {
  groups: [''],
};

export const VotingDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [formData, setFormData] = useState(formInitialData);
  const { votingGetById, votingDelete } = useVotingAdminContext();
  const { addInfo } = useMessagesContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  useEffect(() => {
    if (Id) {
      votingGetById?.getVotingById({ id: `${Id}` });
    }
  }, [Id]);

  useEffect(() => {
    if (votingGetById?.data) {
      setFormData({
        groups: votingGetById.data.groups.map((group) => group.name),
      });
    }
  }, [votingGetById?.data]);

  useEffect(() => {
    if (votingDelete?.data) {
      handleClose();
      addInfo(`Голосування для груп ${formData.groups.map((group) => group).join(',')} видалене`);
    }
  }, [votingDelete?.data]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    votingDelete?.votingDelete(Id);
  };

  return (
    <ModalWindow modalTitle="Видалення голосування" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <h3 className={pagesStyle.subtitle}>
          Ви дійсно бажаєте видалити голосування для груп:
          "
          {formData.groups.map((group) => group).join(',')}
          "  ?
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

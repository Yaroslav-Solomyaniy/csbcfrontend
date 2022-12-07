import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { ICreateModal } from '../../../../../types';
import { VotingsAdmin } from '../../../../../context/Pages/admin/Votings';
import { MessagesContext } from '../../../../../context/All/Messages';
import CreateEditRevoteFormVotingAdmin from '../form/CreateEditRevoteFormVotingAdmin';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { ICreateVotingParams } from '../../../../../hooks/api/admin/voting/useCreate';

const formInitialData: ICreateVotingParams = {
  groups: [],
  startDate: null,
  endDate: null,
  requiredCourses: [],
  notRequiredCourses: [],
};

export const VotingCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICreateVotingParams>(formInitialData);
  const { createVoting } = VotingsAdmin();
  const { addInfo } = MessagesContext();

  const handleClose = () => {
    setIsSubmitted(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.groups
      && formData.requiredCourses
      && formData.notRequiredCourses
      && formData.startDate
      && formData.endDate
      && (formData.endDate > formData.startDate)
    ) {
      createVoting?.createVoting({ ...formData,
        startDate: moment(formData.startDate).format(),
        endDate: moment(formData.endDate).format() });
    }
  };

  useEffect(() => {
    if (createVoting?.data) {
      handleClose();
      addInfo('Нове голосування додане у список');
    }
  }, [createVoting?.data]);

  return (
    <ModalWindow modalTitle="Створення голосування" active={modalActive} closeModal={handleClose}>
      <CreateEditRevoteFormVotingAdmin
        isSubmitted={isSubmitted}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
      />
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Створити"
      />
    </ModalWindow>
  );
};

export default VotingCreateModal;

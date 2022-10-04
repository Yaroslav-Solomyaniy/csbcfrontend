import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { ICreateModal } from '../../../../../types';
import { ICreateVotingParams } from '../../../../../hooks/PagesInAdmin/useVotings';
import { VotingsAdmin } from '../../../../../context/PagesInAdmin/Votings';
import { MessagesContext } from '../../../../../context/All/Messages';
import CreateEditRevoteFormVotingAdmin from '../form/CreateEditRevoteFormVotingAdmin';

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
  const { votingCreate } = VotingsAdmin();
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
      votingCreate?.votingCreate({ ...formData,
        startDate: moment(formData.startDate).format(),
        endDate: moment(formData.endDate).format() });
    }
  };

  useEffect(() => {
    if (votingCreate?.data) {
      handleClose();
      addInfo('Нове голосування додане у список');
    }
  }, [votingCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення голосування" active={modalActive} closeModal={handleClose}>
      <CreateEditRevoteFormVotingAdmin
        handleClose={handleClose}
        isSubmitted={isSubmitted}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
      />
    </ModalWindow>
  );
};

export default VotingCreateModal;

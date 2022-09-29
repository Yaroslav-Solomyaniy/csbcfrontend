import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { ICreateModal } from '../../../../../types';
import { ICreateVotingParams } from '../../../../../hooks/useVotingAdmin';
import { useVotingAdminContext } from '../../../../../context/voting';
import { useMessagesContext } from '../../../../../context/messagesContext';
import MobileModalWindow from '../../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../../context/TypeDevice';
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
  const { votingCreate } = useVotingAdminContext();
  const { addInfo } = useMessagesContext();
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

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
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Створення голосування" active={modalActive} closeModal={handleClose}>
          <CreateEditRevoteFormVotingAdmin
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <CreateEditRevoteFormVotingAdmin
            modalTitle="Створення голосування"
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default VotingCreateModal;

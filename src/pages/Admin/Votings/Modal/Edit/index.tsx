import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import 'react-datepicker/dist/react-datepicker.css';
import { IVotingEditParams } from '../../../../../hooks/useVotingAdmin';
import { useVotingAdminContext } from '../../../../../context/voting';
import { useMessagesContext } from '../../../../../context/messagesContext';
import CreateEditRevoteFormVotingAdmin from '../form/CreateEditRevoteFormVotingAdmin';
import MobileModalWindow from '../../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../../context/TypeDevice';

const formInitialData: IVotingEditParams = {
  groups: [],
  startDate: null,
  endDate: null,
  requiredCourses: [],
  notRequiredCourses: [],
  isRevote: false,
};

interface IEditModalAndRevote {
  modalActive: boolean;
  closeModal: () => void;
  id: number;
  isRevote?: boolean;
}

export const VotingEditModal = (
  { modalActive,
    closeModal,
    id,
    isRevote,
  }: IEditModalAndRevote,
): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(formInitialData);
  const { votingGetById, votingEdit } = useVotingAdminContext();
  const { addInfo } = useMessagesContext();
  const { isTablet, isPhone, isDesktop } = useDeviceContext();

  const handleClose = () => {
    setIsSubmitted(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 500);
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
      votingEdit?.votingEdit({
        ...formData,
        startDate: moment(formData.startDate).format(),
        endDate: moment(formData.endDate).format(),
        isRevote,
      }, id);
    }
  };

  useEffect(() => {
    if (votingEdit?.data) {
      handleClose();
      addInfo('Голосування успішно відредаговане');
    }
  }, [votingEdit?.data]);

  useEffect(() => {
    if (id) {
      votingGetById?.getVotingById({ id: `${id}` });
    }
  }, [id]);

  useEffect(() => {
    if (votingGetById?.data) {
      setFormData({
        groups: votingGetById.data.groups.map((group) => group.id),
        requiredCourses: votingGetById.data.requiredCourses.map((course) => course.id),
        notRequiredCourses: votingGetById.data.notRequiredCourses.map((course) => course.id),
        startDate: moment(votingGetById.data.startDate).toDate(),
        endDate: moment(votingGetById.data.endDate).toDate(),
      });
    }
  }, [votingGetById?.data]);

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Редагування голосування" active={modalActive} closeModal={handleClose}>
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
            modalTitle="Редагування голосування"
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

VotingEditModal.defaultProps = {
  isRevote: false,
};

export default VotingEditModal;

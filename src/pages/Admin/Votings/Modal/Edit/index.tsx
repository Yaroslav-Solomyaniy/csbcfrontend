import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import 'react-datepicker/dist/react-datepicker.css';
import { VotingsAdmin } from '../../../../../context/Pages/admin/Votings';
import { MessagesContext } from '../../../../../context/All/Messages';
import CreateEditRevoteFormVotingAdmin from '../form/CreateEditRevoteFormVotingAdmin';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { IEditVotingParams } from '../../../../../hooks/api/admin/voting/useEdit';

const formInitialData: IEditVotingParams = {
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
  const { getVotingById, editVoting } = VotingsAdmin();
  const { addInfo } = MessagesContext();

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
      editVoting?.editVoting({
        ...formData,
        startDate: moment(formData.startDate).format(),
        endDate: moment(formData.endDate).format(),
        isRevote,
      }, id);
    }
  };

  useEffect(() => {
    if (editVoting?.data) {
      handleClose();
      addInfo('Голосування успішно відредаговане');
    }
  }, [editVoting?.data]);

  useEffect(() => {
    if (id) {
      getVotingById?.getVotingById({ id: `${id}` });
    }
  }, [id]);

  useEffect(() => {
    if (getVotingById?.data) {
      setFormData({
        groups: getVotingById.data.groups.map((group) => group.id),
        requiredCourses: getVotingById.data.requiredCourses.map((course) => course.id),
        notRequiredCourses: getVotingById.data.notRequiredCourses.map((course) => course.id),
        startDate: moment(getVotingById.data.startDate).toDate(),
        endDate: moment(getVotingById.data.endDate).toDate(),
      });
    }
  }, [getVotingById?.data]);

  return (
    <ModalWindow
      modalTitle="Редагування голосування"
      active={modalActive}
      closeModal={handleClose}
    >
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
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

VotingEditModal.defaultProps = {
  isRevote: false,
};

export default VotingEditModal;

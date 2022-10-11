import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../../../components/common/ModalWindow';
import 'react-datepicker/dist/react-datepicker.css';
import { IVotingEditParams } from '../../../../../hooks/PagesInAdmin/useVotings';
import { VotingsAdmin } from '../../../../../context/PagesInAdmin/Votings';
import CreateEditRevoteFormVotingAdmin from '../form/CreateEditRevoteFormVotingAdmin';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

const formInitialData: IVotingEditParams = {
  groups: [],
  startDate: null,
  endDate: null,
  requiredCourses: [],
  notRequiredCourses: [],
  isRevote: true,
};

interface IEditModalAndRevote {
  modalActive: boolean;
  closeModal: () => void;
  id: number;
}

export const RevoteEditModal = (
  { modalActive,
    closeModal,
    id,
  }: IEditModalAndRevote,
): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(formInitialData);
  const { votingGetById, votingEdit } = VotingsAdmin();

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
        isRevote: true,
      }, id);
    }
  };

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
    <ModalWindow modalTitle="Редагування переголосування" active={modalActive} closeModal={handleClose}>
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

export default RevoteEditModal;

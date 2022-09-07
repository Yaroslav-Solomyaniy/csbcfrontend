import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../components/common/ModalWindow';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../types';
import 'react-datepicker/dist/react-datepicker.css';
import MultiSelectGroup from '../../../components/common/MultiSelect/MultiSelectGroup';
import { IVotingEditParams } from '../../../hooks/useVotingAdmin';
import { useVotingAdminContext } from '../../../context/voting';
import { useMessagesContext } from '../../../context/useMessagesContext';
import MyDatePicker from '../../../components/common/datePicker';
import MultiSelectCoursesNoOptional from '../../../components/common/MultiSelect/MultiSelectCoursesNoOptional';

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
  titleModalWindow: string;
  isRevote?: boolean;
}

export const VotingEditModal = (
  { modalActive,
    closeModal,
    id,
    titleModalWindow,
    isRevote,
  }: IEditModalAndRevote,
): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(formInitialData);
  const { votingGetById, votingEdit } = useVotingAdminContext();
  const { addInfo } = useMessagesContext();

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
      if (isRevote) {
        addInfo(' Переголосування успішно відредаговане');
      } else addInfo('Голосування успішно відредаговане');
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
    <ModalWindow modalTitle={titleModalWindow} active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <MultiSelectGroup
          type="modal"
          label="Групи"
          placeholder="Групи"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({
              ...formData,
              groups: value.map((option) => (
                +option.value)),
            });
          }}
          value={formData.groups.map((group) => `${group}`)}
          error={isSubmitted && formData.groups.length < 1 ? 'Групи не обрано.' : ''}
        />
        <MultiSelectCoursesNoOptional
          type="modal"
          label="Профільні предмети"
          placeholder="Профільні предмети"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({
              ...formData,
              requiredCourses: value.map((option) => (
                +option.value)),
            });
          }}
          value={formData.requiredCourses.map((course) => `${course}`)}
          error={isSubmitted && formData.requiredCourses.length < 1 ? 'Не обрано жодного предмету' : ''}
        />
        <MultiSelectCoursesNoOptional
          type="modal"
          label="Не профільні предмети"
          placeholder="Не профільні предмети"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({
              ...formData,
              notRequiredCourses: value.map((option) => (
                +option.value)),
            });
          }}
          value={formData.notRequiredCourses.map((course) => `${course}`)}
          error={isSubmitted && formData.notRequiredCourses.length < 1 ? 'Не обрано жодного предмету' : ''}
        />
        <MyDatePicker
          label="Дата початку"
          placeholder="Дата початку"
          onChange={(date: Date | null) => setFormData({ ...formData, startDate: date || null })}
          selected={formData.startDate !== null ? new Date(formData.startDate) : undefined}
          showMonthDropdown
          showTimeInput
          showTimeSelect
          dateFormat="Pp"
          required
          timeInputLabel="Час початку:"
          showDisabledMonthNavigation
          minDate={new Date(1970, 1, 1)}
          error={isSubmitted && !formData.startDate ? 'Дату початку не обрано' : ''}
        />
        <MyDatePicker
          label="Дата кінця"
          placeholder="Дата кінця"
          onChange={(date: Date | null) => setFormData({ ...formData, endDate: date || null })}
          selected={formData.endDate !== null ? new Date(formData.endDate) : undefined}
          showMonthDropdown
          showTimeInput
          showTimeSelect
          required
          dateFormat="Pp"
          timeInputLabel="Час кінця:"
          showDisabledMonthNavigation
          minDate={new Date(1970, 1, 1)}
          error={isSubmitted
          && ((formData.endDate !== null ? formData.endDate : new Date())
            < (formData.startDate !== null ? formData.startDate : new Date()))
            ? 'Дата кінця не може бути меншою за дату початку'
            : (isSubmitted && !formData.endDate ? 'Дату кінця не обрано' : '')}
        />

      </form>
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

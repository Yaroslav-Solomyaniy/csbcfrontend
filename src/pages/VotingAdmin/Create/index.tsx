import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ModalWindow from '../../../components/common/ModalWindow';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { ICreateModal } from '../../../types';
import MultiSelectGroup from '../../../components/common/MultiSelect/MultiSelectGroup';
import { ICreateVotingParams } from '../../../hooks/useVotingAdmin';
import MyDatePicker from '../../../components/common/datePicker';
import { useVotingAdminContext } from '../../../context/voting';
import { useMessagesContext } from '../../../context/useMessagesContext';
import MultiSelectCoursesNoOptional from '../../../components/common/MultiSelect/MultiSelectCoursesNoOptional';

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
          onChange={(date:Date | null) => setFormData({ ...formData, startDate: date || null })}
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
          onChange={(date:Date | null) => setFormData({ ...formData, endDate: date || null })}
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
        mainButtonText="Додати"
      />
    </ModalWindow>
  );
};

export default VotingCreateModal;

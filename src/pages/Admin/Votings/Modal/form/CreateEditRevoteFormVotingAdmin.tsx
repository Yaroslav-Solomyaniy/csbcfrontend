import React from 'react';
import styles from '../../../../pagesStyle.module.scss';
import MultiSelectGroup from '../../../../../components/common/MultiSelect/MultiSelectGroup';
import MultiSelectCoursesNoOptional from '../../../../../components/common/MultiSelect/MultiSelectCoursesNoOptional';
import MyDatePicker from '../../../../../components/common/DatePicker';
import { ICreateVotingParams } from '../../../../../hooks/PagesInAdmin/useVotings';

interface ICreateEditRevoteFormVotingAdmin{
  formData: ICreateVotingParams;
  setFormData: (value:ICreateVotingParams) => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
  isSubmitted: boolean;
}
const CreateEditRevoteFormVotingAdmin = ({ formData,
  setFormData,
  isSubmitted,
  onSubmit }:ICreateEditRevoteFormVotingAdmin) => (
    <form className={styles.form} onSubmit={onSubmit}>
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
        label="Фахові компетентності"
        placeholder="Фахові компетентності"
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
        typeConduct="Фахова"
      />
      <MultiSelectCoursesNoOptional
        type="modal"
        label="Загальні компетентності"
        placeholder="Загальні компетентності"
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
        typeConduct="Загальна"
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
);

export default CreateEditRevoteFormVotingAdmin;

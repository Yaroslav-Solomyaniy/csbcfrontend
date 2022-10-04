import React from 'react';
import { IStudentCreateParams } from '../../../../../hooks/PagesInAdmin/useStudents';
import styles from '../../../../pagesStyle.module.scss';
import ModalInput from '../../../../../components/common/MyInput';
import { Email, EmailValidation } from '../../../../../types/regExp';
import MyDatePicker from '../../../../../components/common/DatePicker';
import SelectGroupById from '../../../../../components/common/Select/SelectGroupById';
import SelectIsFullTime from '../../../../../components/common/Select/SelectIsFullTime';

interface ICreateOrEditStudentsForm{
  formData: IStudentCreateParams;
  setFormData: (value:IStudentCreateParams) => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
  isSubmitted: boolean;
  modalTitle?: string;
}
const CreateOrEditStudentsForm = ({ formData,
  setFormData,
  isSubmitted,
  onSubmit,
  modalTitle }:ICreateOrEditStudentsForm) => (
    <>
      {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
      <form className={styles.form} onSubmit={onSubmit}>
        <ModalInput
          required
          label="Прізвище"
          placeholder="Прізвище"
          value={formData.user.lastName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, lastName: event.target.value.slice(0, 20) } });
          }}
          error={isSubmitted && !formData.user.lastName ? 'Прізвище не введено' : ''}
        />
        <ModalInput
          required
          label="Ім`я"
          placeholder="Ім`я"
          value={formData.user.firstName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, firstName: event.target.value.slice(0, 20) } });
          }}
          error={isSubmitted && !formData.user.firstName ? 'Ім`я не введено' : ''}
        />
        <ModalInput
          required
          label="По батькові"
          placeholder="По батькові"
          value={formData.user.patronymic}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, patronymic: event.target.value.slice(0, 20) } });
          }}
          error={isSubmitted && !formData.user.patronymic ? 'По батькові не введено' : ''}
        />

        <MyDatePicker
          label="Дата народження"
          placeholder="Дата народження"
          onChange={(date: Date | null) => setFormData({ ...formData, dateOfBirth: date || null })}
          selected={formData.dateOfBirth !== null ? new Date(formData.dateOfBirth) : undefined}
          showMonthDropdown
          showDisabledMonthNavigation
          maxDate={new Date()}
          minDate={new Date(1970, 1, 1)}
          required
          error={isSubmitted && !formData.dateOfBirth ? 'Дата народження не обрана' : ''}
        />
        <SelectGroupById
          type="modal"
          label="Група"
          placeholder="Група"
          isClearable
          isSearchable
          required
          value={formData.groupId}
          onChange={(value) => {
            setFormData({ ...formData, groupId: +value });
          }}
          error={isSubmitted && !formData.groupId ? 'Жодної групи не обрано' : ''}
        />
        <ModalInput
          required
          label="Номер наказу"
          placeholder="Номер наказу"
          value={formData.orderNumber}
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value.slice(0, 20) });
          }}
          error={isSubmitted && (`${formData.orderNumber}`.length < 6
        || `${formData.orderNumber}`.length > 20
            ? 'Номер наказу повинен містити не менше 6-ти символів.' : '')}
        />
        <ModalInput
          required
          label="ЄДЕБО"
          placeholder="ЄДЕБО"
          value={formData.edeboId}
          onChange={(event) => {
            setFormData({ ...formData, edeboId: event.target.value.slice(0, 8) });
          }}
          error={isSubmitted && formData.edeboId.length !== 8
            ? 'Номер ЄДЕБО повинен містити 8 символів' : ''}
        />
        <ModalInput
          required
          label="E-Mail"
          placeholder="E-Mail"
          value={formData.user.email}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, email: event.target.value.slice(0, 40) } });
          }}
          error={isSubmitted && !Email.test(formData.user.email)
            ? (formData.user.email.length < 1 ? 'E-mail не введено' : 'E-mail введено не вірно') : ''}
          pattern={EmailValidation}
        />
        <SelectIsFullTime
          menuPos="absolute"
          type="modal"
          label="Форма навчання"
          required
          placeholder="Форма навчання"
          onChange={(value) => {
            setFormData({ ...formData, isFullTime: value });
          }}
          value={formData.isFullTime}
        />
      </form>

    </>
);

CreateOrEditStudentsForm.defaultProps = {
  modalTitle: '',
};

export default CreateOrEditStudentsForm;

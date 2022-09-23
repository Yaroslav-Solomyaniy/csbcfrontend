import React from 'react';
import { IUserCreateParams } from '../../../../../hooks/useUser';
import styles from '../../../../pagesStyle.module.scss';
import ModalInput from '../../../../../components/common/ModalInput';
import { Email, EmailValidation, LettersAndNumbersEnUa } from '../../../../../types/regExp';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

interface IAdministratorsForm{
  formData: IUserCreateParams;
  setFormData: (value:IUserCreateParams) => void;
  handleClose:() => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
  isSubmitted: boolean;
  modalTitle?: string;
}

const AdministratorsForm = ({ formData,
  setFormData,
  isSubmitted,
  onSubmit,
  handleClose,
  modalTitle }:IAdministratorsForm) => (
    <>
      {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
      <form className={styles.form} onSubmit={onSubmit}>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, lastName: event.target.value.slice(0, 15) });
          }}
          value={formData.lastName}
          placeholder="Прізвище"
          label="Прізвище"
          required
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, firstName: event.target.value.slice(0, 10) });
          }}
          value={formData.firstName}
          placeholder="Ім'я"
          label="Ім'я"
          required
          error={isSubmitted && !formData.firstName ? "Ім'я не введено" : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, patronymic: event.target.value.slice(0, 15) });
          }}
          value={formData.patronymic}
          placeholder="По-Батькові"
          label="По-Батькові"
          required
          error={isSubmitted && !formData.patronymic ? 'По батькові не введено' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, email: event.target.value.slice(0, 40) });
          }}
          value={formData.email}
          placeholder="Електронна пошта"
          label="Електронна пошта"
          required
          error={isSubmitted && !Email.test(formData.email)
            ? (formData.email.length < 1 ? 'Електронну пошту не введено' : 'Електронну пошту введено не вірно') : ''}
          pattern={EmailValidation}
        />
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Створити"
      />
    </>
);

AdministratorsForm.defaultProps = {
  modalTitle: '',
};
export default AdministratorsForm;

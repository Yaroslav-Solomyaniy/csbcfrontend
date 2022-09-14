import React, { useEffect, useState } from 'react';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../types';
import ModalInput from '../../../components/common/ModalInput';
import { Email, EmailValidation, LettersAndNumbersEnUa } from '../../../types/regExp';
import { IUserEditParams } from '../../../hooks/useUser';
import { useAdministratorsContext } from '../../../context/administators';
import { useMessagesContext } from '../../../context/messagesContext';

const formInitialData: IUserEditParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
};

export const AdministratorEditModal = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const [isSubmitted, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<IUserEditParams>(formInitialData);
  const { administratorsEdit, getAdministratorsId } = useAdministratorsContext();
  const { addInfo } = useMessagesContext();

  const handleClose = () => {
    setIsSubmited(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);

    if (formData.firstName
      && formData.lastName
      && formData.patronymic
      && formData.lastName
      && Email.test(formData.email)) {
      administratorsEdit?.userEdit({ ...formData }, studentId);
    }
  };

  useEffect(() => {
    handleClose();
    if (administratorsEdit?.data) {
      addInfo(`Адміністратор "${formData.lastName} ${formData.firstName} ${formData.patronymic}" відредагований`);
    }
  }, [administratorsEdit?.data]);

  useEffect(() => {
    if (studentId) {
      getAdministratorsId?.getUserId({ id: `${studentId}` });
    }
  }, [studentId]);

  useEffect(() => {
    if (getAdministratorsId?.data) {
      setFormData({
        firstName: getAdministratorsId?.data.firstName,
        lastName: getAdministratorsId?.data.lastName,
        patronymic: getAdministratorsId?.data.patronymic,
        email: getAdministratorsId?.data.email,
      });
    }
  }, [getAdministratorsId?.data]);

  return (
    <ModalWindow modalTitle="Редагування адміністратора" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
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
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default AdministratorEditModal;

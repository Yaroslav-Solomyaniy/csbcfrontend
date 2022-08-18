import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../components/common/ModalWindow';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalInput from '../../../components/common/ModalInput';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { ICreateModal } from '../../../types';
import { Email, EmailValidation, LettersAndNumbersEnUa } from '../../../types/regExp';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IUserCreateParams } from '../../../hooks/useUser';
import { useAdministratorsContext } from '../../../context/administators';

const formInitialData: IUserCreateParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'admin',
};

export const AdministratorCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const { administratorsCreate } = useAdministratorsContext();
  const { addInfo } = useMessagesContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IUserCreateParams>(formInitialData);

  const handleClose = () => {
    setIsSubmitted(false);
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 1500);
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.firstName && formData.lastName && formData.patronymic && Email.test(formData.email)) {
      administratorsCreate?.createUser(formData);
    }
  };

  useEffect(() => {
    handleClose();
    if (administratorsCreate?.data) {
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic}
      успішно доданий`);
    }
  }, [administratorsCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення адміністратора" active={modalActive} closeModal={handleClose}>
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
        mainButtonText="Додати"
      />
    </ModalWindow>
  );
};

export default AdministratorCreateModal;

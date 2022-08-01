import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from './index.module.scss';
import Input from '../../../components/common/Input';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { ICreateModal } from '../../../types';
import { LettersAndNumbersEnUa } from '../../../types/regExp';
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
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.firstName && formData.lastName && formData.patronymic && formData.email) {
      administratorsCreate?.createUser(formData);
    }
  };

  useEffect(() => {
    closeModal();
    if (administratorsCreate?.data) {
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic}
      успішно доданий у список адміністраторів.`);
    }
  }, [administratorsCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення адміністратора" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          onChange={(event) => {
            setFormData({ ...formData, lastName: event.target.value });
          }}
          value={formData.lastName}
          placeholder="Прізвище"
          label="Прізвище"
          required
          error={isSubmitted && !formData.lastName ? 'Прізвище не введено' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, firstName: event.target.value });
          }}
          value={formData.firstName}
          placeholder="Ім'я"
          label="Ім'я"
          required
          error={isSubmitted && !formData.firstName ? "\"Ім'я\" не введено" : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, patronymic: event.target.value });
          }}
          value={formData.patronymic}
          placeholder="По-Батькові"
          label="По-Батькові"
          required
          error={isSubmitted && !formData.patronymic ? 'В поле "По-Батькові" нічого не введено' : ''}
          pattern={LettersAndNumbersEnUa}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, email: event.target.value });
          }}
          value={formData.email}
          placeholder="E-mail"
          label="E-mail"
          required
          error={isSubmitted && !formData.email ? 'E-mail не введено' : ''}
        />
      </form>
      <ModalControlButtons
        handleClose={closeModal}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Додати"
      />
    </ModalWindow>
  );
};

export default AdministratorCreateModal;

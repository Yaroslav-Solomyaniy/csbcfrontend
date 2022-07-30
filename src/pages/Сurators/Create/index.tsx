import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from './index.module.scss';
import Input from '../../../components/common/Input';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useCuratorContext } from '../../../context/curators';
import { ICreateModal } from '../../../types';
import { ICuratorCreateParams } from '../../../hooks/useCurators';
import { LettersAndNumbersEnUa } from '../../../types/regExp';
import { useMessagesContext } from '../../../context/useMessagesContext';
import InputEmail from '../../../components/common/InputEmail';

const formInitialData: ICuratorCreateParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'curator',
};

export const CuratorCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const { curatorCreate } = useCuratorContext();
  const { addInfo } = useMessagesContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICuratorCreateParams>(formInitialData);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.firstName && formData.lastName && formData.patronymic && formData.email) {
      curatorCreate?.createCurator(formData);
    }
  };

  useEffect(() => {
    closeModal();
    if (curatorCreate?.data) {
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic} успішно доданий у список кураторів.`);
    }
  }, [curatorCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення куратора" active={modalActive} closeModal={handleClose}>
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
        <InputEmail
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          placeholder="E-Mail"
          label="E-Mail"
          error={isSubmitted ? 'E-Mail не введено' : ''}
          required
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

export default CuratorCreateModal;

import React, { useEffect, useState } from 'react';

import { useGroupContext } from '../../../context/group';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from './index.module.scss';
import Input from '../../../components/common/Input';
import ModalControlButtons from '../../../components/common/ModalControlButtons';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
}

interface typeFormInitialDataCurators {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
}

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
};

export const CuratorCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const { groupCreate } = useGroupContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<typeFormInitialDataCurators>(formInitialData);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.firstName && formData.lastName && formData.patronymic && formData.email) {
      // groupCreate?.groupCreate(formData);
    }
  };

  useEffect(() => {
    closeModal();
  }, [groupCreate?.data]);

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
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, email: event.target.value });
          }}
          value={formData.email}
          placeholder="E-Mail"
          label="E-Mail"
          required
          error={isSubmitted && !formData.email ? 'E-Mail не введено' : ''}
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

import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../types';
import Input from '../../../components/common/Input';
import { LettersAndNumbersEnUa } from '../../../types/regExp';
import { IUserEditParams } from '../../../hooks/useUser';
import { useAdministratorsContext } from '../../../context/administators';

const formInitialData: IUserEditParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'admin',
};

export const AdministratorEditModal = ({ modalActive, closeModal, Id }: IEditModal): JSX.Element => {
  const [isSubmitted, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<IUserEditParams>(formInitialData);
  const { administratorsEdit, getAdministratorsId } = useAdministratorsContext();

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);

    if (formData.firstName && formData.lastName && formData.patronymic && formData.lastName && formData.email) {
      administratorsEdit?.userEdit({ ...formData }, Id);
      closeModal();
    }
  };

  useEffect(() => {
    if (Id) {
      getAdministratorsId?.getUserId({ id: `${Id}` });
    }
  }, [Id]);

  useEffect(() => {
    if (getAdministratorsId?.data) {
      setFormData({
        firstName: getAdministratorsId?.data.firstName,
        lastName: getAdministratorsId?.data.lastName,
        patronymic: getAdministratorsId?.data.patronymic,
        email: getAdministratorsId?.data.email,
        role: getAdministratorsId?.data.role,
      });
    }
  }, [getAdministratorsId?.data]);

  return (
    <ModalWindow modalTitle="Редагування адміністратора" active={modalActive} closeModal={handleClose}>
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
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default AdministratorEditModal;

import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { ICreateModal } from '../../../../../types';
import { Email } from '../../../../../types/regExp';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IUserCreateParams } from '../../../../../hooks/All/useUser';
import { AdministratorsContext } from '../../../../../context/PagesInAdmin/Administators';
import AdministratorsForm from '../form/Create&Edit';

const formInitialData: IUserCreateParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'admin',
};

export const AdministratorCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IUserCreateParams>(formInitialData);

  const { administratorsCreate } = AdministratorsContext();
  const { addInfo } = MessagesContext();

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
    if (formData.firstName && formData.lastName && formData.patronymic && Email.test(formData.email)) {
      administratorsCreate?.createUser(formData);
    }
  };

  useEffect(() => {
    if (administratorsCreate?.data) {
      handleClose();
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic}
      успішно доданий`);
    }
  }, [administratorsCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення адміністратора" active={modalActive} closeModal={handleClose}>
      <AdministratorsForm
        handleClose={handleClose}
        isSubmitted={isSubmitted}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
      />
    </ModalWindow>
  );
};

export default AdministratorCreateModal;

import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { ICreateModal } from '../../../../../types';
import { Email } from '../../../../../types/regExp';
import { MessagesContext } from '../../../../../context/All/Messages';
import { AdministratorsContext } from '../../../../../context/Pages/admin/Administators';
import AdministratorsForm from '../form/Create&Edit';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { ICreateUserParams } from '../../../../../hooks/api/user/useCreate';

const formInitialData: ICreateUserParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'admin',
};

export const AdministratorCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICreateUserParams>(formInitialData);

  const { createAdmin } = AdministratorsContext();
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
      createAdmin?.createUser(formData);
    }
  };

  useEffect(() => {
    if (createAdmin?.data) {
      handleClose();
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic}
      успішно доданий`);
    }
  }, [createAdmin?.data]);

  return (
    <ModalWindow modalTitle="Створення адміністратора" active={modalActive} closeModal={handleClose}>
      <>
        <AdministratorsForm
          isSubmitted={isSubmitted}
          setFormData={setFormData}
          formData={formData}
          onSubmit={onSubmit}
        />
        <ModalControlButtons
          handleClose={handleClose}
          onSubmit={onSubmit}
          cancelButtonText="Відміна"
          mainButtonText="Створити"
        />
      </>
    </ModalWindow>
  );
};

export default AdministratorCreateModal;

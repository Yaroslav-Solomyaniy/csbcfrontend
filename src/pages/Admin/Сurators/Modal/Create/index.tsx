import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { CuratorContext } from '../../../../../context/Pages/admin/Curators';
import { ICreateModal } from '../../../../../types';
import { Email } from '../../../../../types/regExp';
import { MessagesContext } from '../../../../../context/All/Messages';
import CuratorsForm from '../form/create&edit';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { ICreateUserParams } from '../../../../../hooks/api/user/useCreate';

const formInitialData: ICreateUserParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'curator',
};

export const CuratorCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICreateUserParams>(formInitialData);
  const { createCurator } = CuratorContext();
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
      createCurator?.createUser(formData);
    }
  };

  useEffect(() => {
    if (createCurator?.data) {
      handleClose();
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic} доданий у список`);
    }
  }, [createCurator?.data]);

  return (
    <ModalWindow modalTitle="Створення куратора" active={modalActive} closeModal={handleClose}>
      <CuratorsForm
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
    </ModalWindow>
  );
};

export default CuratorCreateModal;

import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import { useCuratorContext } from '../../../../context/curators';
import { ICreateModal } from '../../../../types';

import { Email } from '../../../../types/regExp';
import { useMessagesContext } from '../../../../context/messagesContext';
import { IUserCreateParams } from '../../../../hooks/useUser';
import MobileModalWindow from '../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../context/TypeDevice';
import CuratorsForm from '../form/create&edit';

const formInitialData: IUserCreateParams = {
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  role: 'curator',
};

export const CuratorCreateModal = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IUserCreateParams>(formInitialData);

  const { curatorCreate } = useCuratorContext();
  const { addInfo } = useMessagesContext();
  const { isPhone, isDesktop, isTablet } = useDeviceContext();

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
      curatorCreate?.createUser(formData);
    }
  };

  useEffect(() => {
    if (curatorCreate?.data) {
      handleClose();
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic} доданий у список`);
    }
  }, [curatorCreate?.data]);

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Створення куратора" active={modalActive} closeModal={handleClose}>
          <CuratorsForm
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <CuratorsForm
            modalTitle="Створення куратора"
            handleClose={handleClose}
            isSubmitted={isSubmitted}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default CuratorCreateModal;

import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import { IDeleteModal } from '../../../../types';
import { useMessagesContext } from '../../../../context/messagesContext';
import { useAdministratorsContext } from '../../../../context/administators';
import MobileModalWindow from '../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../context/TypeDevice';
import AdministratorsDeleteForm from '../form/Delete';

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
};

export const AdministratorDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [formData, setFormData] = useState(formInitialData);
  const { administratorsDelete, getAdministratorsId } = useAdministratorsContext();
  const { addInfo } = useMessagesContext();
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  useEffect(() => {
    if (Id) {
      getAdministratorsId?.getUserId({ id: `${Id}` });
    }
  }, [Id]);

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  useEffect(() => {
    if (getAdministratorsId?.data) {
      setFormData({
        firstName: getAdministratorsId?.data.firstName,
        lastName: getAdministratorsId?.data.lastName,
        patronymic: getAdministratorsId?.data.patronymic,
      });
    }
  }, [getAdministratorsId?.data]);

  useEffect(() => {
    if (administratorsDelete?.data) {
      handleClose();
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic} видалений зі списку адміністраторів`);
    }
  }, [administratorsDelete?.data]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    administratorsDelete?.userDelete(Id);
  };

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Видалення адміністратора" active={modalActive} closeModal={handleClose}>
          <AdministratorsDeleteForm
            handleClose={handleClose}
            formData={formData}
            onSubmit={onSubmit}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <AdministratorsDeleteForm
            modalTitle="Видалення адміністратора"
            handleClose={handleClose}
            formData={formData}
            onSubmit={onSubmit}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default AdministratorDeleteModal;

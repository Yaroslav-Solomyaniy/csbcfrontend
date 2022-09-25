import React, { useEffect, useState } from 'react';
import pagesStyle from '../../../pagesStyle.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { IDeleteModal } from '../../../../types';
import { useCuratorContext } from '../../../../context/curators';
import { useMessagesContext } from '../../../../context/messagesContext';
import AdministratorsDeleteForm from '../../../Administrators/ModalWindow/form/Delete';
import MobileModalWindow from '../../../../components/common/MobileModalWindow';
import { useDeviceContext } from '../../../../context/TypeDevice';
import CuratorsDeleteForm from '../form/delete';

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
};

export const CuratorDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [formData, setFormData] = useState(formInitialData);

  const { isTablet, isPhone, isDesktop } = useDeviceContext();
  const { addInfo } = useMessagesContext();
  const { curatorDelete, getCuratorId } = useCuratorContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  useEffect(() => {
    if (Id) {
      getCuratorId?.getUserId({ id: `${Id}` });
    }
  }, [Id]);

  useEffect(() => {
    if (getCuratorId?.data) {
      setFormData({
        firstName: getCuratorId?.data.firstName,
        lastName: getCuratorId?.data.lastName,
        patronymic: getCuratorId?.data.patronymic,
      });
    }
  }, [getCuratorId?.data]);

  useEffect(() => {
    if (curatorDelete?.data) {
      handleClose();
      addInfo(`Куратор "${formData.lastName} ${formData.firstName} ${formData.patronymic}" видалений`);
    }
  }, [curatorDelete?.data]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    curatorDelete?.userDelete(Id);
  };

  return (
    <>
      {isDesktop && (
        <ModalWindow modalTitle="Видалення куратора" active={modalActive} closeModal={handleClose}>
          <CuratorsDeleteForm
            handleClose={handleClose}
            formData={formData}
            onSubmit={onSubmit}
          />
        </ModalWindow>
      )}
      {(isTablet || isPhone) && (
        <MobileModalWindow isActive={modalActive}>
          <CuratorsDeleteForm
            modalTitle="Видалення куратора"
            handleClose={handleClose}
            formData={formData}
            onSubmit={onSubmit}
          />
        </MobileModalWindow>
      )}
    </>
  );
};

export default CuratorDeleteModal;

import React, { useEffect, useState } from 'react';
import pagesStyle from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IDeleteModal } from '../../../types';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { useAdministratorsContext } from '../../../context/administators';

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
};

export const VotingDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const { administratorsDelete, getAdministratorsId } = useAdministratorsContext();
  const [formData, setFormData] = useState(formInitialData);
  const { addInfo } = useMessagesContext();

  useEffect(() => {
    if (Id) {
      getAdministratorsId?.getUserId({ id: `${Id}` });
    }
  }, [Id]);

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 1500);
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
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic} видалений зі списку адміністраторів.`);
    }
  }, [administratorsDelete?.data]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    administratorsDelete?.userDelete(Id);
    closeModal();
  };

  return (
    <ModalWindow modalTitle="Видалення голосування" active={modalActive} closeModal={handleClose}>
      <form className={pagesStyle.form} onSubmit={onSubmit}>
        <h3 className={pagesStyle.subtitle}>
          {' '}
          Ви дійсно бажаєте видалити голосування для груп:
          `
          {formData.lastName}
          `?
          {' '}
        </h3>
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Видалити"
      />
    </ModalWindow>
  );
};

export default VotingDeleteModal;

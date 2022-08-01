import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IDeleteModal } from '../../../types';
import { useCuratorContext } from '../../../context/curators';
import { useMessagesContext } from '../../../context/useMessagesContext';

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
};

export const CuratorDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const { curatorDelete, getCuratorId } = useCuratorContext();
  const [formData, setFormData] = useState(formInitialData);
  const { addInfo } = useMessagesContext();

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
      addInfo(`${formData.lastName} ${formData.firstName} ${formData.patronymic} видалений зі списку кураторів.`);
    }
  }, [curatorDelete?.data]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    curatorDelete?.userDelete(Id);
    closeModal();
  };

  return (
    <ModalWindow modalTitle="Видалення куратора" active={modalActive} closeModal={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.subtitle}>
          {' '}
          Ви дійсно бажаєте видалити куратора
          `
          {formData.lastName}
          {' '}
          {formData.firstName}
          {' '}
          {formData.patronymic}
          `?
          {' '}
        </h3>
      </form>
      <ModalControlButtons
        handleClose={closeModal}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Видалити"
      />
    </ModalWindow>
  );
};

export default CuratorDeleteModal;

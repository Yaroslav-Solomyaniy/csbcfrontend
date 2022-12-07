import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IDeleteModal } from '../../../../../types';
import { CuratorContext } from '../../../../../context/Pages/admin/Curators';
import { MessagesContext } from '../../../../../context/All/Messages';
import styles from '../../../../pagesStyle.module.scss';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
};

export const CuratorDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [formData, setFormData] = useState(formInitialData);

  const { addInfo } = MessagesContext();
  const { deleteCurator, getCuratorById } = CuratorContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  useEffect(() => {
    if (Id) {
      getCuratorById?.getUserById({ id: `${Id}` });
    }
  }, [Id]);

  useEffect(() => {
    if (getCuratorById?.data) {
      setFormData({
        firstName: getCuratorById?.data.firstName,
        lastName: getCuratorById?.data.lastName,
        patronymic: getCuratorById?.data.patronymic,
      });
    }
  }, [getCuratorById?.data]);

  useEffect(() => {
    if (deleteCurator?.data) {
      handleClose();
      addInfo(`Куратор "${formData.lastName} ${formData.firstName} ${formData.patronymic}" видалений`);
    }
  }, [deleteCurator?.data]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    deleteCurator?.deleteUser(Id);
  };

  return (
    <ModalWindow modalTitle="Видалення куратора" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.subtitle}>
          {`Ви дійсно бажаєте видалити куратора:
        "${formData.lastName} ${formData.firstName} ${formData.patronymic}" ?`}
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

export default CuratorDeleteModal;

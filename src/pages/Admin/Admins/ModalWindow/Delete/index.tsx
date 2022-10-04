import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { IDeleteModal } from '../../../../../types';
import { MessagesContext } from '../../../../../context/All/Messages';
import { AdministratorsContext } from '../../../../../context/PagesInAdmin/Administators';
import styles from '../../../../pagesStyle.module.scss';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

const formInitialData = {
  firstName: '',
  lastName: '',
  patronymic: '',
};

export const AdministratorDeleteModal = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [formData, setFormData] = useState(formInitialData);
  const { administratorsDelete, getAdministratorsId } = AdministratorsContext();
  const { addInfo } = MessagesContext();

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
    <ModalWindow modalTitle="Видалення адміністратора" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.subtitle}>
          {`Ви дійсно бажаєте видалити адміністратора
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

export default AdministratorDeleteModal;

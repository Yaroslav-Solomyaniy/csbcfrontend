import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../../components/common/ModalWindow';
import { GroupsContext } from '../../../../../context/PagesInAdmin/Groups';
import { MessagesContext } from '../../../../../context/All/Messages';
import { IDeleteModal } from '../../../../../types';
import styles from '../../../../pagesStyle.module.scss';
import ModalInput from '../../../../../components/common/MyInput';
import { NumbersAndLettersEn } from '../../../../../types/regExp';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

const formInitialData = {
  deletedOrderNumber: '',
};

export const GroupDelete = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(formInitialData);

  const { addInfo } = MessagesContext();
  const { groupDelete, getGroupId } = GroupsContext();
  const [orderNumber, setOrderNumber] = useState('');

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

    if (
      (`${formData.deletedOrderNumber}`.length >= 6 && `${formData.deletedOrderNumber}`.length <= 20)
      && formData.deletedOrderNumber === orderNumber) {
      groupDelete?.groupDelete(Id);
    }
  };

  useEffect(() => {
    if (groupDelete?.data) {
      handleClose();
      addInfo(`Група "${getGroupId?.data?.name}" успішно видалена`);
    }
  }, [groupDelete?.data]);

  useEffect(() => {
    if (getGroupId?.data) {
      setOrderNumber(getGroupId.data.orderNumber);
    }
  }, [getGroupId?.data]);

  useEffect(() => {
    if (Id) {
      getGroupId?.getGroupId({ id: `${Id}` });
    }
  }, [Id]);

  return (
    <ModalWindow modalTitle="Видалення групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.subtitle}>Для підтвердження видалення групи введіть номер наказу.</h3>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, deletedOrderNumber: event.target.value.slice(0, 8) });
          }}
          value={formData.deletedOrderNumber}
          error={isSubmitted && orderNumber !== formData.deletedOrderNumber
            ? 'Номер наказу введено невірно'
            : (isSubmitted
              && (`${formData.deletedOrderNumber}`.length < 6 || `${formData.deletedOrderNumber}`.length > 20
                ? 'Номер наказу повинен містити не менше 6-ти символів' : ''))}
          placeholder="Номер наказу"
          pattern={NumbersAndLettersEn}
        />
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

export default GroupDelete;

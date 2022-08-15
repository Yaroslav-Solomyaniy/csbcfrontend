import React, { useEffect, useState } from 'react';
import styles from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { IGroupDeleteParams } from '../../../hooks/useGroups';
import { useGroupContext } from '../../../context/group';
import Input from '../../../components/common/Input';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IDeleteModal } from '../../../types';
import { NumbersAndLettersEn } from '../../../types/regExp';

const formInitialData = {
  deletedOrderNumber: '',
};

export const GroupDelete = ({ modalActive, closeModal, Id }: IDeleteModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<IGroupDeleteParams>(formInitialData);
  const { groupDelete, getGroupId } = useGroupContext();

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);

    if (`${formData.deletedOrderNumber}`.length >= 6
      && `${formData.deletedOrderNumber}`.length <= 20) {
      groupDelete?.groupDelete({ ...formData }, Id);
    }
  };

  useEffect(() => {
    handleClose();
    if (groupDelete?.data) {
      addInfo(`Групу: ${getGroupId?.data?.name} успішно видалено за номером наказу: ${formData.deletedOrderNumber}.`);
    }
  }, [groupDelete?.data]);

  useEffect(() => {
    if (Id) {
      getGroupId?.getGroupId({ id: `${Id}` });
    }
  }, [Id]);

  return (
    <ModalWindow modalTitle="Видалення групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.subtitle}>Для підтвердження видалення групи введіть номер наказу.</h3>
        <Input
          onChange={(event) => {
            setFormData({ ...formData, deletedOrderNumber: event.target.value });
          }}
          value={formData.deletedOrderNumber.slice(0, 8)}
          error={isSubmitted && (`${formData.deletedOrderNumber}`.length < 6
          || `${formData.deletedOrderNumber}`.length > 20
            ? 'Номер наказу повинен містити не менше 6-ти символів.' : '')}
          placeholder="Номер наказу"
          label="Номер наказу"
          required
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

import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { IGroupDeleteParams } from '../../../hooks/useGroups';
import { useGroupContext } from '../../../context/group';
import Input from '../../../components/common/Input';
import ModalControlButtons from '../../../components/common/ModalControlButtons';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
  groupId: number;
}

const formInitialData = {
  deletedOrderNumber: '',
};

export const GroupDeleteModal = ({ modalActive, closeModal, groupId }: IGroupCreateModal): JSX.Element => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<IGroupDeleteParams>(formInitialData);
  const { groupDelete, getGroupId } = useGroupContext();

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);

    if (`${formData.deletedOrderNumber}`.length >= 6
      && `${formData.deletedOrderNumber}`.length <= 20) {
      groupDelete?.groupDelete({ ...formData }, groupId);
    }
  };

  useEffect(() => {
    handleClose();
  }, [groupDelete?.data]);

  useEffect(() => {
    if (groupId) {
      getGroupId?.getGroupId({ id: `${groupId}` });
    }
  }, [groupId]);

  return (
    <ModalWindow modalTitle="Видалення групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, deletedOrderNumber: event.target.value });
          }}
          value={formData.deletedOrderNumber.slice(0, 7)}
          error={isSubmited && (`${formData.deletedOrderNumber}`.length < 6
          || `${formData.deletedOrderNumber}`.length > 20
            ? 'Номер наказу повинен містити не менше 6-ти символів.' : '')}
          placeholder="Номер наказу"
          label="Номер наказу"
          required
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

export default GroupDeleteModal;

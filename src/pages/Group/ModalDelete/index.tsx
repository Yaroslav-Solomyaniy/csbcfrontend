import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { IGroupDeleteParams } from '../../../hooks/useGroups';
import { Option } from '../../../types';
import { useGroupContext } from '../../../context/group';
import Input from '../../../components/common/Input';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
  groupId: number;
}

const curators: Option[] = [
  { value: 524, label: "Ярослав Солом'яний" },
  { value: 62131, label: 'Вадим Сіренко' },
];
const orderNumber: Option[] = [
  { value: '5235212', label: '523512' },
  { value: '5235123', label: '523513' },
];

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

    if (formData.deletedOrderNumber) {
      groupDelete?.groupDelete({ ...formData }, groupId);
      closeModal();
    }
  };

  useEffect(() => {
    if (groupId) {
      getGroupId?.getGroupId({ id: `${groupId}` });
    }
  }, [groupId]);

  return (
    <ModalWindow modalTitle="Видалення групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          onChange={(event) => {
            setFormData({ ...formData, deletedOrderNumber: event.target.value });
          }}
          value={formData.deletedOrderNumber}
          error={isSubmited && !formData.deletedOrderNumber ? 'Номер наказу не введено' : ''}
          placeholder="Номер наказу"
          label="Номер наказу"
          required
        />
      </form>
      <div className={styles.modal__buttons}>
        <button
          type="button"
          className={styles.modal__buttons_revert}
          onClick={handleClose}
        >
          Відміна
        </button>
        <button
          type="button"
          className={styles.modal__buttons_submit}
          onClick={onSubmit}
        >
          Створити
        </button>
      </div>
    </ModalWindow>
  );
};

export default GroupDeleteModal;

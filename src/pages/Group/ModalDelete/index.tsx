import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { IGroupDeleteParams, useGroupDelete, useGroupId } from '../../../hooks/useGroups';
import { Option } from '../../../types';

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
  const { data: dataGetGroupId, getGroupId } = useGroupId();
  const { groupDelete } = useGroupDelete();

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);

    if (formData.deletedOrderNumber) {
      console.log({ ...formData }, groupId);
      groupDelete({ ...formData }, groupId);
      closeModal();
    }
  };

  useEffect(() => {
    if (groupId) {
      getGroupId({ id: `${groupId}` });
    }
  }, [groupId]);

  return (
    <ModalWindow modalTitle="Видалення групи" active={modalActive} setActive={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>

        <div className={styles.form__row}>
          <label className={styles.form__row_label}>Номер наказу*</label>

          <input
            className={styles.form__row_group}
            placeholder="Номер наказу"
            value={formData.deletedOrderNumber}
            onChange={(event) => {
              setFormData({ ...formData, deletedOrderNumber: event.target.value });
            }}
          />
        </div>
        {isSubmited && !formData.deletedOrderNumber && (
          <div className={styles.form__error}>
            <label className={styles.form__error_label} />
            <div className={styles.form__error_text}>Номер наказу не введено</div>
          </div>
        )}

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

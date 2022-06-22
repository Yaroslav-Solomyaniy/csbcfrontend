import Select from 'react-select';
import React, { useState } from 'react';
import styles from './index.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import { ICreateGroupParams, useGroupsCreate } from '../../../../hooks/useGroups';

interface IGroupCreateModal {
  closeModal: () => void;
  modalActive: boolean;
}

export const GroupCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const { data, createGroup } = useGroupsCreate();
  const [formData, setFormData] = useState<ICreateGroupParams>({
    name: '',
    curatorId: 0,
    orderNumber: '',
    deletedOrderNumber: '',
  });

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    createGroup(formData);
  };

  return (
    <ModalWindow modalTitle="Створення групи" active={modalActive} setActive={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form__input}>
          <label className={styles.input__label}>Назва групи</label>
          <input
            className={styles.input__select}
            placeholder="Назва групи"
            value={formData.name}
            onChange={(event) => {
              setFormData({ ...formData, name: event.target.value });
            }}
          />
        </div>
        <div className={styles.form__input}>
          <label className={styles.input__label}>Номер наказу</label>
          <Select
            className={styles.input__select}
            options={[]}
            placeholder="Номер наказу"
            isClearable
            value={formData.orderNumber}
          />
        </div>
        <div className={styles.form__input}>
          <label className={styles.input__label}>Куратор</label>
          <Select
            className={styles.input__select}
            options={[]}
            placeholder="Куратор"
            isClearable
            value={formData.curatorId}
          />
        </div>
      </form>
      <div className={styles.modal__buttons}>
        <button
          type="button"
          className={styles.modal_revert}
          onClick={closeModal}
        >
          Відміна
        </button>
        <button
          type="button"
          className={styles.modal_submit}
          onClick={onSubmit}
        >
          Створити
        </button>
      </div>
    </ModalWindow>
  );
};

export default GroupCreateModal;

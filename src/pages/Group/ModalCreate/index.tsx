import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../components/common/ModalWindow';
import { ICreateGroupParams, useGroupsCreate } from '../../../hooks/useGroups';
import { Option } from '../../../types';

import styles from '../index.module.scss';
import Select from '../../../components/common/Select';
import Input from '../../../components/common/Input';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
}

const curators: Option[] = [
  { value: 5, label: '5' },
  { value: 235, label: 'CuratorId: 235' },
];

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

export const GroupCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const { data, createGroup } = useGroupsCreate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICreateGroupParams>(formInitialData);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.name && formData.orderNumber && formData.curatorId) {
      createGroup(formData);
    }
  };

  useEffect(() => {
    if (data) {
      closeModal();
    } else {
      console.log('');
    }
  }, [data]);

  return (
    <ModalWindow modalTitle="Створення групи" active={modalActive} setActive={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form__row}>
          <label className={styles.form__row_label}>Назва групи*</label>
          <input
            className={styles.form__row_group}
            placeholder="Назва групи"
            value={formData.name}
            onChange={(event) => {
              setFormData({ ...formData, name: event.target.value });
            }}
          />
        </div>
        {isSubmitted && !formData.name && (
          <div className={styles.form__error}>
            <label className={styles.form__error_label} />
            <div className={styles.form__error_text}>Номер групи введено не правильно</div>
          </div>
        )}
        <Input
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value });
          }}
          value={formData.orderNumber}
          placeholder="Номер наказу"
          label="Номер наказу"
          required
          error={isSubmitted && !formData.orderNumber ? 'Номер наказу не введено' : ''}
        />
        <Select
          label="Куратор"
          placeholder="Куратор"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, curatorId: +value });
          }}
          options={curators}
          value={formData.curatorId}
          error={isSubmitted && !formData.curatorId ? 'Назву куратора не введено' : ''}
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

export default GroupCreateModal;

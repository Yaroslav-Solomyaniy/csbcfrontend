import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { ICreateGroupParams, useGroupsCreate } from '../../../hooks/useGroups';
import { Option } from '../../../types';

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
  const [isSubmited, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<ICreateGroupParams>(formInitialData);

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
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
        {isSubmited && !formData.name && (
          <div className={styles.form__error}>
            <label className={styles.form__error_label} />
            <div className={styles.form__error_text}>Номер групи введено не правильно</div>
          </div>
        )}

        <div className={styles.form__row}>
          <label className={styles.form__row_label}>Номер наказу*</label>

          <input
            className={styles.form__row_orderNumber}
            placeholder="Номер наказу"
            value={formData.orderNumber}
            onChange={(event) => {
              setFormData({ ...formData, orderNumber: event.target.value });
            }}
          />
        </div>
        {isSubmited && !formData.orderNumber && (
          <div className={styles.form__error}>
            <label className={styles.form__error_label} />
            <div className={styles.form__error_text}>Номер наказу не введено</div>
          </div>
        )}

        <div className={styles.form__row}>
          <label className={styles.form__row_label}>Куратор*</label>
          <Select
            className={styles.form__row_select}
            isSearchable
            options={curators}
            placeholder="Куратор"
            isClearable
            value={curators.find(({ value }) => formData.curatorId === value) || null}
            onChange={(value) => {
              setFormData({ ...formData, curatorId: value?.value ? +value.value : 0 });
            }}
          />
        </div>
        {isSubmited && !formData.curatorId && (
          <div className={styles.form__error}>
            <label className={styles.form__error_label} />
            <div className={styles.form__error_text}>Назву куратора не введено</div>
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

export default GroupCreateModal;

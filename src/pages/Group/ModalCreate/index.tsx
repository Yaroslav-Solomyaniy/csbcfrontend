import React, { useEffect, useState } from 'react';
import { useGroupContext } from '../../../context/group';
import { IGroupCreateParams } from '../../../hooks/useGroups';
import Select from '../../../components/common/Select';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from '../index.module.scss';
import Input from '../../../components/common/Input';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
}

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

const curators = [{
  value: 5, label: '5',
}];

export const GroupCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IGroupCreateParams>(formInitialData);
  const { groupCreate } = useGroupContext();

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);
    if (formData.name && formData.orderNumber && formData.curatorId) {
      groupCreate?.groupCreate(formData);
    }
  };

  useEffect(() => {
    if (groupCreate?.data) {
      closeModal();
    }
  }, [groupCreate?.data]);

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

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { ICreateGroupParams, useGroupsCreate } from '../../../hooks/useGroupsGet';
import { Option } from '../../../types';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
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
  name: '',
  curatorId: 0,
  orderNumber: '',
  deletedOrderNumber: '123456',
};

export const GroupDeleteModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const [isSubmited, setIsSubmited] = useState(false);
  const { data, createGroup } = useGroupsCreate();
  const [formData, setFormData] = useState<ICreateGroupParams>(formInitialData);

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
    if (formData.orderNumber) {
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
    <ModalWindow modalTitle="Видалення групи" active={modalActive} setActive={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>

        <div className={styles.form__row}>
          <label className={styles.form__row_label}>Номер наказу*</label>

          <Select
            className={styles.form__row_select}
            options={orderNumber}
            placeholder="Номер наказу"
            isClearable
            value={orderNumber.find(({ value }) => formData.orderNumber === value) || null}
            onChange={(value) => {
              setFormData({ ...formData, orderNumber: value?.value ? value.value.toString() : '' });
            }}
          />
        </div>
        {isSubmited && !formData.orderNumber && (
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
          onClick={closeModal}
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

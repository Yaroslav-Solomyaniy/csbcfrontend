import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { ICreateGroupParams, useGroupId } from '../../../hooks/useGroupsGet';
import { Option } from '../../../types';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
  groupId: number;
}

const curators: Option[] = [
  { value: 5, label: "Ярослав Солом'яний" },
  { value: 4, label: 'Вадим Сіренко' },
];

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
  deletedOrderNumber: null,
};

export const GroupEditModal = ({ modalActive, closeModal, groupId }: IGroupCreateModal): JSX.Element => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<ICreateGroupParams>(formInitialData);

  const { data: dataGetGroupId, getGroupId } = useGroupId();

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
    if (formData.name && formData.orderNumber && formData.curatorId) {
      console.log('hi');
    }
  };

  useEffect(() => {
    if (dataGetGroupId) {
      setFormData({ ...formInitialData, curatorId: dataGetGroupId.curator.id, ...dataGetGroupId });
    }
  }, [dataGetGroupId]);

  useEffect(() => {
    if (groupId) {
      getGroupId({ id: `${groupId}` });
    }
  }, [groupId]);

  return (
    <ModalWindow modalTitle="Редагування групи" active={modalActive} setActive={closeModal}>
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

export default GroupEditModal;

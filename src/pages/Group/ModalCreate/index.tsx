import React, { useEffect, useState } from 'react';

import { useGroupContext } from '../../../context/group';
import { IGroupCreateParams } from '../../../hooks/useGroups';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from './index.module.scss';
import Input from '../../../components/common/Input';
import SelectCurator from '../../../components/common/SelectCurator';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
}

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

const curators = [
  {
    value: 5, label: '5',
  },
];

export const GroupCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const { groupCreate } = useGroupContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<IGroupCreateParams>(formInitialData);

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
    closeModal();
  }, [groupCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          onChange={(event) => {
            setFormData({ ...formData, name: event.target.value });
          }}
          value={formData.name}
          placeholder="Номер групи"
          label="Номер групи"
          required
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
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
        <SelectCurator
          type="modal"
          label="Куратор"
          placeholder="Куратор"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, curatorId: +value });
          }}
          value={formData.curatorId}
          error={isSubmitted && !formData.curatorId ? 'Куратора не обрано!' : ''}
        />
      </form>
      <div className={styles.modal_buttons}>
        <button
          type="button"
          className={styles.modal_revert}
          onClick={handleClose}
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

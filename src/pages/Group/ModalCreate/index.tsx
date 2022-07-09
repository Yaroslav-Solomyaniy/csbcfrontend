import React, { useEffect, useState } from 'react';

import { useGroupContext } from '../../../context/group';
import { IGroupCreateParams } from '../../../hooks/useGroups';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from './index.module.scss';
import Input from '../../../components/common/Input';
import SelectCurator from '../../../components/common/SelectCurator';
import ModalControlButtons from '../../../components/common/ModalControlButtons';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
}

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

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
    if (formData.name && (`${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20) && formData.curatorId) {
      groupCreate?.groupCreate(formData);
    }
  };

  useEffect(() => {
    handleClose();
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
          error={isSubmitted && !formData.name ? 'Номер групи не введено.' : ''}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value });
          }}
          value={formData.orderNumber.slice(0, 7)}
          error={isSubmitted && (`${formData.orderNumber}`.length < 6
          || `${formData.orderNumber}`.length > 20
            ? 'Номер наказу повинен містити не менше 6-ти символів.' : '')}
          placeholder="Номер наказу"
          label="Номер наказу"
          required
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
          error={isSubmitted && !formData.curatorId ? 'Куратор не обраний.' : ''}
        />
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Створити"
      />
    </ModalWindow>
  );
};

export default GroupCreateModal;

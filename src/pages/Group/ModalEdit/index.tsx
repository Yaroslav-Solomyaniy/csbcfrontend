import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { IGroupEditParams } from '../../../hooks/useGroups';
import { useGroupContext } from '../../../context/group';
import Input from '../../../components/common/Input';
import SelectCurator from '../../../components/common/SelectCurator';
import ModalControlButtons from '../../../components/common/ModalControlButtons';

interface IGroupCreateModal {
  modalActive: boolean;
  closeModal: () => void;
  groupId: number;
}

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

export const GroupEditModal = ({ modalActive, closeModal, groupId }: IGroupCreateModal): JSX.Element => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [formData, setFormData] = useState<IGroupEditParams>(formInitialData);
  const { groupEdit, getGroupId } = useGroupContext();

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);

    if (formData.name && formData.orderNumber) {
      if (formData.curatorId) {
        groupEdit?.groupEdit({ ...formData }, groupId);
        closeModal();
      }
    }
  };

  useEffect(() => {
    if (groupId) {
      getGroupId?.getGroupId({ id: `${groupId}` });
    }
  }, [groupId]);

  useEffect(() => {
    if (getGroupId?.data) {
      setFormData({
        name: getGroupId?.data.name,
        orderNumber: getGroupId?.data.orderNumber,
        curatorId: getGroupId?.data.curator.id,
      });
    }
  }, [getGroupId?.data]);

  return (
    <ModalWindow modalTitle="Редагування групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          onChange={(event) => {
            setFormData({ ...formData, name: event.target.value });
          }}
          value={formData.name}
          error={isSubmited && !formData.name ? 'Номер групи не введено' : ''}
          placeholder="Номер групи"
          label="Номер групи"
          required
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value });
          }}
          value={formData.orderNumber}
          error={isSubmited && !formData.orderNumber ? 'Номер наказу не введено' : ''}
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
          error={isSubmited && !formData.curatorId ? 'Куратора не обрано!' : ''}
        />

      </form>
      <ModalControlButtons
        handleClose={closeModal}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default GroupEditModal;

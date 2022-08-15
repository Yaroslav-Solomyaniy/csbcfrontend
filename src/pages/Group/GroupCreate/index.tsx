import React, { useEffect, useState } from 'react';

import { useGroupContext } from '../../../context/group';
import { IGroupCreateParams } from '../../../hooks/useGroups';
import ModalWindow from '../../../components/common/ModalWindow';
import styles from '../../pagesStyle.module.scss';
import Input from '../../../components/common/Input';
import SelectCurator from '../../../components/common/Select/SelectCurator';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { ICreateModal } from '../../../types';
import { LettersAndNumbersEnUa, NumbersAndLettersEn } from '../../../types/regExp';

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

export const GroupCreate = ({ modalActive, closeModal }: ICreateModal): JSX.Element => {
  const { groupCreate } = useGroupContext();
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<IGroupCreateParams>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    if (groupCreate?.data) {
      addInfo(`Група ${groupCreate?.data?.name} успішно створена.`);
    }
  }, [groupCreate?.data]);

  return (
    <ModalWindow modalTitle="Створення групи" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          onChange={(event) => {
            setFormData({ ...formData, name: event.target.value.slice(0, 6) });
          }}
          value={formData.name}
          placeholder="Номер групи"
          label="Номер групи"
          required
          error={isSubmitted && !formData.name ? 'Номер групи не введено.' : ''}
          pattern={LettersAndNumbersEnUa}
        />

        <Input
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value.slice(0, 8) });
          }}
          value={formData.orderNumber}
          error={isSubmitted && (`${formData.orderNumber}`.length < 6
          || `${formData.orderNumber}`.length > 20
            ? 'Номер наказу повинен містити не менше 6-ти символів.' : '')}
          placeholder="Номер наказу"
          label="Номер наказу"
          required
          pattern={NumbersAndLettersEn}
        />
        <SelectCurator
          type="modal"
          label="Куратор"
          placeholder="Куратор"
          required
          isSearchable
          isClearable
          onChange={(value) => {
            setFormData({ ...formData, curatorId: +value.slice(0, 8) });
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

export default GroupCreate;

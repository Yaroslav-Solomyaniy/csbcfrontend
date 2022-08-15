import React, { useEffect, useState } from 'react';
import styles from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { IGroupEditParams } from '../../../hooks/useGroups';
import { useGroupContext } from '../../../context/group';
import Input from '../../../components/common/Input';
import SelectCurator from '../../../components/common/Select/SelectCurator';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IEditModal } from '../../../types';
import { LettersAndNumbersEnUa, NumbersAndLettersEn } from '../../../types/regExp';

const formInitialData = {
  name: '',
  curatorId: 0,
  orderNumber: '',
};

export const EstimatesEdit = ({ modalActive, closeModal, Id }: IEditModal): JSX.Element => {
  const { groupEdit, getGroupId } = useGroupContext();
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<IGroupEditParams>(formInitialData);
  const [isSubmitted, setIsSubmited] = useState(false);

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
    if (formData.name && (`${formData.orderNumber}`.length >= 6
      && `${formData.orderNumber}`.length <= 20) && formData.curatorId) {
      groupEdit?.groupEdit({ ...formData }, Id);
    }
  };

  useEffect(() => {
    handleClose();
    if (groupEdit?.data) {
      addInfo(`Група: ${getGroupId?.data?.name} з номером наказу:
      ${getGroupId?.data?.orderNumber} успішно відредагована.`);
    }
  }, [groupEdit?.data]);

  useEffect(() => {
    if (Id) {
      getGroupId?.getGroupId({ id: `${Id}` });
    }
  }, [Id]);

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
          error={isSubmitted && !formData.name ? 'Номер групи не введено.' : ''}
          placeholder="Номер групи"
          label="Номер групи"
          required
          pattern={LettersAndNumbersEnUa}
        />
        <Input
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value });
          }}
          value={formData.orderNumber.slice(0, 8)}
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
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default EstimatesEdit;

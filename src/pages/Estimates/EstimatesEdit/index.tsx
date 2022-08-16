import React, { useEffect, useState } from 'react';
import styles from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import Input from '../../../components/common/Input';
import SelectCurator from '../../../components/common/Select/SelectCurator';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IEditModal } from '../../../types';
import { useEstimatesContext } from '../../../context/estimates';

const formInitialData = {
  newEstimates: '',
  reasonChange: '',
};

export const EstimatesEdit = ({ modalActive, closeModal, Id }: IEditModal): JSX.Element => {
  const { estimatesEdit, estimatesGetId } = useEstimatesContext();
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<>(formInitialData);
  const [isSubmitted, setIsSubmited] = useState(false);

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
  };

  useEffect(() => {
    handleClose();
  }, [estimatesEdit?.data]);

  useEffect(() => {
    if (Id) {
      estimatesGetId?.getEstimatesId({ id: Id });
    }
  }, [Id]);

  useEffect(() => {
    if (estimatesGetId?.data) {
      setFormData({
        name: estimatesGetId?.data.name,
        orderNumber: estimatesGetId?.data.orderNumber,
        curatorId: estimatesGetId?.data.curator.id,
      });
    }
  }, [estimatesGetId?.data]);

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

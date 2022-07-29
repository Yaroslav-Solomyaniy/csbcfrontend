import React, { useEffect, useState } from 'react';
import ModalWindow from '../../../../components/common/ModalWindow';
import Input from '../../../../components/common/Input';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { useStudentsContext } from '../../../../context/students';
import styles from '../index.module.scss';

interface IStudentsDeleteModal {
  modalActive: boolean;
  closeModal: () => void;
  id: number;
}

const formInitialData = {
  deletedOrderNumber: '',
};

export const StudentsDeleteModal = ({ modalActive, closeModal, id }: IStudentsDeleteModal): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(formInitialData);
  const { deleteStudentsItem, getStudent } = useStudentsContext();

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmitted(true);

    if (`${formData.deletedOrderNumber}`.length >= 6
      && `${formData.deletedOrderNumber}`.length <= 20) {
      deleteStudentsItem?.deleteStudent(id, `${getStudent?.data?.user.lastName}
      ${getStudent?.data?.user.firstName}
      ${getStudent?.data?.user.patronymic}`);
    }
  };

  useEffect(() => {
    handleClose();
  }, [deleteStudentsItem?.data]);

  useEffect(() => {
    if (id) {
      getStudent?.getStudent({ id: `${id}` });
    }
  }, [id]);

  return (
    <ModalWindow modalTitle="Видалення викладача" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.subtitle}>Для підтвердження видалення введіть номер наказу.</h3>
        <Input
          onChange={(event) => {
            setFormData({ ...formData, deletedOrderNumber: event.target.value });
          }}
          value={formData.deletedOrderNumber.slice(0, 8)}
          error={isSubmitted && (`${formData.deletedOrderNumber}`.length < 6
          || `${formData.deletedOrderNumber}`.length > 20
            ? 'Номер наказу повинен містити не менше 6-ти символів.' : '')}
          placeholder="Номер наказу"
          label="Номер наказу"
          required
        />
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Видалити"
      />
    </ModalWindow>
  );
};

export default StudentsDeleteModal;

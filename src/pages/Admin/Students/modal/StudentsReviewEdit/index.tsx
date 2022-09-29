import React from 'react';
import styles from './index.module.scss';
import stylesStud from '../../../../pagesStyle.module.scss';
import ModalWindow from '../../../../../components/common/ModalWindow';
import Select from '../../../../../components/common/Select';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import { useStudentsContext } from '../../../../../context/students';

interface IStudentsReviewModal {
  closeModal: () => void;
  modalActive: boolean;
}

const StudentsReviewEdit = ({ modalActive, closeModal }: IStudentsReviewModal) => {
  const { getStudentById } = useStudentsContext();

  const handleClose = () => {
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    handleClose();
  };

  return (
    <ModalWindow modalTitle="Редагування індивідуального плану" active={modalActive} closeModal={handleClose}>
      <form className={stylesStud.form} onSubmit={onSubmit}>
        <p className={styles.form__name}>
          {`${getStudentById?.data?.user.lastName} ${getStudentById?.data?.user.firstName}
            ${getStudentById?.data?.user.patronymic}`}
        </p>
        <p className={styles.form__title}>Вибіркові предмети</p>
        <Select
          type="modal"
          label="Профільний предмет"
          placeholder="Профільний предмет"
          required
          isClearable
          isSearchable
          options={[]}
          value="!"
          onChange={() => undefined}
          error=""
        />
        <Select
          type="modal"
          label="Непрофільний предмет"
          placeholder="Непрофільний предмет"
          required
          isSearchable
          isClearable
          options={[]}
          value="!"
          onChange={() => undefined}
          error=""
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

export default StudentsReviewEdit;

import React from 'react';
import styles from '../../../../pagesStyle.module.scss';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

interface IStudentsDeleteForm{
  student: string;
  handleClose:() => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
  modalTitle?: string;
}

const StudentsDeleteForm = ({
  student,
  handleClose,
  modalTitle,
  onSubmit,
}:IStudentsDeleteForm) => (
  <>
    {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.subtitle}>{`Ви дійсно бажаєте видалити студента: "${student}" ?`}</h3>
    </form>
    <ModalControlButtons
      handleClose={handleClose}
      onSubmit={onSubmit}
      cancelButtonText="Відміна"
      mainButtonText="Видалити"
    />
  </>
);

StudentsDeleteForm.defaultProps = {
  modalTitle: '',
};

export default StudentsDeleteForm;

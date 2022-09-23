import React from 'react';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import styles from '../../../../pagesStyle.module.scss';

interface IAdministratorsDeleteForm{
  formData: Record<string, string>;
  handleClose:() => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
  modalTitle?: string;
}

const AdministratorsDeleteForm = ({ formData,
  handleClose,
  modalTitle,
  onSubmit,
}:IAdministratorsDeleteForm):JSX.Element => (
  <>
    {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.subtitle}>
        {`Ви дійсно бажаєте видалити адміністратора  
        "${formData.lastName} ${formData.firstName} ${formData.patronymic}" ?`}
      </h3>
    </form>
    <ModalControlButtons
      handleClose={handleClose}
      onSubmit={onSubmit}
      cancelButtonText="Відміна"
      mainButtonText="Видалити"
    />
  </>
);

AdministratorsDeleteForm.defaultProps = {
  modalTitle: '',
};

export default AdministratorsDeleteForm;

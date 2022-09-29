import React from 'react';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';
import styles from '../../../../pagesStyle.module.scss';

interface IFormDeleteVoting{
  groups: string[];
  handleClose:() => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
  modalTitle?: string;
}

const FormDeleteVoting = ({ groups, modalTitle, handleClose, onSubmit }:IFormDeleteVoting) => (
  <>
    {modalTitle && (<div className={styles.modal__title}>{modalTitle}</div>)}
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.subtitle}>
        {`Ви дійсно бажаєте видалити голосування для груп: "${
          groups.map((group) => group).join(',')
        }" ?`}
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

FormDeleteVoting.defaultProps = {
  modalTitle: '',
};

export default FormDeleteVoting;

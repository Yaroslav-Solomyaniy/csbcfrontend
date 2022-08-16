import React from 'react';
import Button from '../Button';
import styles from './index.module.scss';

interface IModalButtons {
  cancelButtonText?: string;
  mainButtonText?: string;
  isOffSubmit?: boolean;
  handleClose: () => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
}

const ModalControlButtons = ({
  handleClose,
  onSubmit,
  cancelButtonText,
  mainButtonText,
  isOffSubmit,
}: IModalButtons): JSX.Element => (
  <div className={styles.footer__modal}>
    <div className={styles.block_Buttons}>
      <Button
        onClick={handleClose}
        nameClass="secondary"
        size="small"
        className={styles.cancelButton}
      >
        {cancelButtonText}
      </Button>
      {!isOffSubmit ? (
        <Button
          onClick={onSubmit}
          nameClass="primary"
          size="small"
          className={styles.submitButton}
        >
          {mainButtonText}
        </Button>
      ) : ''}
    </div>
  </div>
);

ModalControlButtons.defaultProps = {
  cancelButtonText: '',
  mainButtonText: '',
  isOffSubmit: false,
};

export default ModalControlButtons;

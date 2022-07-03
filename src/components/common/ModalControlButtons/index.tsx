import React from 'react';
import Button from '../Button';
import styles from './index.module.scss';

interface IModalButtons {
  cancelButtonText?: string;
  mainButtonText?: string;
  handleClose: () => void;
  onSubmit: (e: React.FormEvent | undefined) => void;
}

const ModalControlButtons = ({
  handleClose,
  onSubmit,
  cancelButtonText,
  mainButtonText,
}: IModalButtons): JSX.Element => (
  <div className={styles.footer__modal}>
    <div className={styles.block_Buttons}>
      <Button onClick={handleClose} nameClass="secondary" size="small">{cancelButtonText}</Button>
      <Button onClick={onSubmit} nameClass="primary" size="small">{mainButtonText}</Button>
    </div>
  </div>
);

ModalControlButtons.defaultProps = {
  cancelButtonText: '',
  mainButtonText: '',
};

export default ModalControlButtons;

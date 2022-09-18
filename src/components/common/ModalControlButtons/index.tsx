import React from 'react';
import clsx from 'clsx';
import Button from '../Button';
import styles from './index.module.scss';
import { useDeviceContext } from '../../../context/TypeDevice';

interface IModalButtons {
  cancelButtonText?: string;
  mainButtonText?: string;
  handleClose: () => void;
  onSubmit?: (e: React.FormEvent | undefined) => void;
}

const ModalControlButtons = ({
  handleClose,
  onSubmit,
  cancelButtonText,
  mainButtonText,
}: IModalButtons): JSX.Element => {
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  return (
    <div className={clsx(isDesktop && styles.block_Buttons, (isTablet || isPhone) && styles.notebookButtonsModal)}>
      <Button
        onClick={handleClose}
        nameClass="secondary"
        size="small"
        className={styles.cancelButton}
      >
        {cancelButtonText}
      </Button>
      {onSubmit && (
      <Button
        onClick={onSubmit}
        nameClass="primary"
        size="small"
        className={styles.submitButton}
      >
        {mainButtonText}
      </Button>
      )}
    </div>
  );
};

ModalControlButtons.defaultProps = {
  cancelButtonText: '',
  mainButtonText: '',
  onSubmit: undefined,
};

export default ModalControlButtons;

import React from 'react';
import clsx from 'clsx';
import Button from '../Button';
import styles from './index.module.scss';
import { DeviceContext } from '../../../context/All/DeviceType';

interface IModalButtons {
  cancelButtonText?: string;
  mainButtonText?: string;
  handleClose: () => void;
  onSubmit?: (e: React.FormEvent | undefined) => void;
  isDisabled?: boolean;
}

const ModalControlButtons = ({
  handleClose,
  onSubmit,
  cancelButtonText,
  mainButtonText,
  isDisabled,
}: IModalButtons): JSX.Element => {
  const { isDesktop, isTablet, isPhone } = DeviceContext();

  return (
    <div className={clsx(isDesktop && styles.block_Buttons, (isTablet || isPhone) && styles.AdaptiveButtonsModal)}>
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
        disabled={isDisabled}
        className={clsx(styles.submitButton, mainButtonText === 'Видалити' && styles.redButton)}
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
  isDisabled: false,
};

export default ModalControlButtons;

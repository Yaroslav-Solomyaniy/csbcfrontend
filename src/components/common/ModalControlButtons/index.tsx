import React from 'react';
import clsx from 'clsx';
import Button from '../Button';
import styles from './index.module.scss';
import { DeviceContext } from '../../../context/All/DeviceType';

interface IModalButtons {
  cancelButtonText?: string;
  mainButtonText?: string;
  handleClose?: () => void;
  onSubmit?: (e: React.FormEvent | undefined) => void;
  isDisabled?: boolean;
  isRevoteButton?: boolean;
  changeWindow?: (value: number) => void;
  votingId?: number;
}

const ModalControlButtons = ({
  handleClose,
  onSubmit,
  cancelButtonText,
  mainButtonText,
  isDisabled,
  isRevoteButton,
  changeWindow,
  votingId,
}: IModalButtons): JSX.Element => {
  const { isDesktop, isTablet, isPhone } = DeviceContext();

  return (
    <div className={clsx(isDesktop && styles.block_Buttons, (isTablet || isPhone) && styles.AdaptiveButtonsModal)}>
      {handleClose && (
        <Button
          onClick={handleClose}
          nameClass="secondary"
          size="small"
          className={styles.cancelButton}
        >
          {cancelButtonText}
        </Button>
      )}
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
      {isRevoteButton && (
        <Button
          onClick={() => changeWindow && votingId ? changeWindow(votingId) : undefined}
          size="small"
          nameClass="primary"
          className={clsx(styles.submitButton, styles.buttonCreateRevoting)}
        >
          Створити переголосування
        </Button>
      )}
    </div>
  );
};

ModalControlButtons.defaultProps = {
  cancelButtonText: '',
  mainButtonText: '',
  handleClose: undefined,
  onSubmit: undefined,
  isDisabled: false,
  isRevoteButton: false,
  changeWindow: () => undefined,
  votingId: 0,
};

export default ModalControlButtons;

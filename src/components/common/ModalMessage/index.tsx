import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { Close } from '../Icons/index';
import Button from '../Button';

interface IModalMessage {
  message: string;
  closeModal: () => void;
  type: 'error' | 'warning' | 'info' | 'voting';
}

const ModalMessage = ({ message, closeModal, type }: IModalMessage): JSX.Element => {
  const [closeMod, setCloseMod] = useState<boolean>(false);

  useEffect(() => {
    if (closeMod) {
      closeModal();
    }
  }, [closeMod]);

  setTimeout(() => setCloseMod(true), 4500);

  return (
    <div className={clsx(styles.login__modal)}>
      <Button
        className={styles.login__modal__button}
        onClick={closeModal}
        isImg
      >
        <Close />
      </Button>

      <div className={clsx(styles.login__modal__div, styles[type])}>{message}</div>
      {type === 'voting' && <Link className={styles[type]} to="/" />}
    </div>
  );
};

export default ModalMessage;

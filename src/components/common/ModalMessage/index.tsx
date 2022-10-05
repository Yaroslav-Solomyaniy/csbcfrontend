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
    <div className={clsx(styles.message, styles[type])}>
      <Button
        className={styles.message__close}
        onClick={closeModal}
        isImg
      >
        <Close />
      </Button>

      <div className={clsx(styles.message__content)}>
        <h6 className={styles.title}>
          {type === 'warning' && 'Увага'}
          {type === 'error' && 'Помилка'}
          {type === 'info' && 'Успішно'}
        </h6>
        <div className={styles.text}>{message}</div>
      </div>
      {type === 'voting' && <Link className={styles[type]} to="/" />}
    </div>
  );
};

export default ModalMessage;

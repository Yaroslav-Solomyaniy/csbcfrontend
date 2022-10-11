import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { Close } from '../Icons';
import Button from '../Button';
import { DeviceContext } from '../../../context/All/DeviceType';

interface IModalMessage {
  message: string;
  closeModal: () => void;
  type: 'error' | 'warning' | 'info' | 'voting';
  id: number;
}

const ModalMessage = ({ message, closeModal, type, id }: IModalMessage): JSX.Element => {
  const [closeMod, setCloseMod] = useState<boolean>(false);
  const { isTablet, isPhone } = DeviceContext();

  useEffect(() => {
    if (closeMod) {
      closeModal();
    }
  }, [closeMod]);

  setTimeout(() => setCloseMod(true), 3000);

  return (
    <div
      style={{ zIndex: 999 + id }}
      className={clsx(
        styles.message,
        (isPhone || isTablet) && styles.message__mobile,
        styles[type],
      )}
    >
      <div className={clsx(styles.message__content)}>
        <h6 className={styles.title}>
          {type === 'warning' && 'Увага.'}
          {type === 'error' && 'Помилка.'}
          {type === 'info' && 'Успішно.'}
          {type === 'voting' && 'Увага! Голосування.'}
        </h6>
        <div className={styles.text}>{message}</div>
      </div>

      {type === 'voting' && (
        <Link to="/voting-students">
          <Button
            onClick={() => undefined}
            nameClass="secondary"
            size="large"
          >
            Перейти
          </Button>
        </Link>

      )}
      <Button
        className={styles.message__close}
        onClick={closeModal}
        isImg
      >
        <Close />
      </Button>
    </div>
  );
};

export default ModalMessage;

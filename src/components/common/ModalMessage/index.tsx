import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { Close } from '../Icons/index';
import Button from '../Button';
import { DeviceContext, deviceContext } from '../../../context/All/DeviceType';

interface IModalMessage {
  message: string;
  closeModal: () => void;
  type: 'error' | 'warning' | 'info' | 'voting';
  id: number;
}

const ModalMessage = ({ message, closeModal, type, id }: IModalMessage): JSX.Element => {
  const [closeMod, setCloseMod] = useState<boolean>(false);
  const { isDesktop, isTablet, isPhone } = DeviceContext();

  useEffect(() => {
    if (closeMod) {
      closeModal();
    }
  }, [closeMod]);

  setTimeout(() => setCloseMod(true), 3500);

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
          {type === 'warning' && 'Увага'}
          {type === 'error' && 'Помилка'}
          {type === 'info' && 'Успішно'}
        </h6>
        <div className={styles.text}>{message}</div>
      </div>
      {/* <Button onClick={() => console.log('text')} nameClass="secondary"
      size="large">Перегол2313213213213213231321осувати</Button> */}
      {type === 'voting' && <Link className={styles[type]} to="/" />}
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

import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import close from '../../../images/login/close.svg';

interface IModalMessage {
  message: string;
  closeModal: () => void;
  type: 'error' | 'warning' | 'info' | 'voting';
}

const ModalMessage = ({ message, closeModal, type }: IModalMessage): JSX.Element => (
  <div className={clsx(styles.login__modal)}>
    <button
      className={styles.login__modal__button}
      type="button"
      onClick={closeModal}
    >
      <img className={styles.login__modal__button__iClose} src={close} alt="close" />
    </button>
    <div className={clsx(styles.login__modal__div, styles[type])}>{message}</div>
    {type === 'voting' && <Link className={styles[type]} to="/" />}
  </div>
);

export default ModalMessage;

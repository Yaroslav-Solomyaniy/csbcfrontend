import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import close from '../../../images/login/close.svg';
import Portal from '../../Portal';

interface ILoginModalAuth {
  error: string;
  closeModal: () => void;
  ref: HTMLDivElement | null;
}

const LoginModalAuth = ({ error, closeModal, ref }: ILoginModalAuth): JSX.Element => (
  <Portal ref={ref}>
    <div className={clsx(styles.login__modal, error && styles.login__modal__error)}>
      <button
        className={styles.login__modal__button}
        type="button"
        onClick={closeModal}
      >
        <img className={styles.login__modal__button__iClose} src={close} alt=" " />
      </button>
      <div className={styles.login__modal__div}>{error}</div>
    </div>
  </Portal>
);

export default LoginModalAuth;

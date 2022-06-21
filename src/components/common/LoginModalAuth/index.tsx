import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import close from '../../../images/login/close.svg';

interface ILoginModalAuth {
  error: string;
  closeModal: () => void;
}

const LoginModalAuth = ({ error, closeModal }: ILoginModalAuth): JSX.Element => (
  <div className={clsx(styles.login__modal)}>
    <button
      className={styles.login__modal__button}
      type="button"
      onClick={closeModal}
    >
      <img className={styles.login__modal__button__iClose} src={close} alt=" " />
    </button>
    <div className={styles.login__modal__div}>{error}</div>
  </div>
);

export default LoginModalAuth;

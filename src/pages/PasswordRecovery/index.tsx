import React, { useState } from 'react';
import styles from './index.module.scss';
import Header from '../../components/Header';
import { ForgotPassword, useForgotPassword } from '../../hooks/useAuth';
import LoginModalAuth from '../../components/common/LoginModalAuth';

const PasswordRecovery = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const { error, postForgotPassword, clearError } = useForgotPassword();
  const [email, setEmail] = useState<ForgotPassword>({ login: ' ' });

  const passwordRecovery = () => {
    postForgotPassword(email);
  };

  return (
    <div className={styles.passwordRecovery}>
      {error && <LoginModalAuth error={error} closeModal={clearError} />}
      <Header setOpen={() => undefined} isAuth />
      {children}
      <div className={styles.passwordRecovery__div}>
        <div className={styles.passwordRecovery__form}>
          <h1 className={styles.passwordRecovery__form__title}>Відновлення паролю</h1>
          <input
            className={styles.passwordRecovery__form__input}
            type="email"
            placeholder="Електронна адреса"
            value={email.login}
            onChange={(event) => setEmail({
              ...email,
              login: event.target.value,
            })}
          />
          <button
            type="submit"
            className={styles.passwordRecovery__form__button}
            disabled={!email.login}
            onClick={passwordRecovery}
          >
            надіслати
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;

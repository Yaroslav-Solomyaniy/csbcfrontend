import React, { useState } from 'react';
import styles from './passwordRecovery.module.scss';
import Header from '../../components/Header/Header';
import { ForgotPassword, useForgotPassword } from '../../hooks/useAuth';

const PasswordRecovery = ({ children }:JSX.ElementChildrenAttribute):JSX.Element => {
  const { postForgotPassword } = useForgotPassword();
  const [email, setEmail] = useState<ForgotPassword>({ login: ' ' });

  const passwordRecovery = () => {
    postForgotPassword(email);
  };

  return (
    <div className={styles.passwordRecovery}>

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

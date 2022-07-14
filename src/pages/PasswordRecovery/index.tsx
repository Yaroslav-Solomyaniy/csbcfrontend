import React, { useState } from 'react';
import styles from './index.module.scss';
import { ForgotPassword, useForgotPassword } from '../../hooks/useAuth';
import Layout from '../../loyout/Layout';

const PasswordRecovery = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const { postForgotPassword } = useForgotPassword();
  const [email, setEmail] = useState<ForgotPassword>({ email: '' });

  const passwordRecovery = () => {
    postForgotPassword(email);
    setEmail({ email: '' });
  };

  return (
    <Layout>
      <div className={styles.passwordRecovery}>
        {children}
        <div className={styles.passwordRecovery__div}>
          <div className={styles.passwordRecovery__form}>
            <h1 className={styles.passwordRecovery__form__title}>Відновлення паролю</h1>
            <input
              className={styles.passwordRecovery__form__input}
              type="email"
              placeholder="Електронна адреса"
              value={email.email}
              onChange={(event) => setEmail({
                ...email,
                email: event.target.value,
              })}
            />
            <button
              type="submit"
              className={styles.passwordRecovery__form__button}
              disabled={!email.email}
              onClick={passwordRecovery}
            >
              Надіслати
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default PasswordRecovery;

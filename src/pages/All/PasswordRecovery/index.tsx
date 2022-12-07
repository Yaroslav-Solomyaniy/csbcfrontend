import React, { useState } from 'react';
import styles from './index.module.scss';
import { ForgotPassword, useForgotPassword } from '../../../hooks/api/all/useAuth';
import Layout from '../../../loyout/Layout';
import Input from '../../../components/common/MyInput/Input';
import { Email, EmailValidation } from '../../../types/regExp';
import Button from '../../../components/common/Button';

const PasswordRecovery = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const { postForgotPassword } = useForgotPassword();
  const [formData, setFormData] = useState<ForgotPassword>({ email: '' });

  const passwordRecovery = () => {
    postForgotPassword(formData);
    setFormData({ email: '' });
  };

  return (
    <Layout>
      <div className={styles.passwordRecovery}>
        {children}
        <div className={styles.passwordRecovery__div}>
          <div className={styles.passwordRecovery__form}>
            <h1 className={styles.passwordRecovery__form__title}>Відновлення паролю</h1>
            <Input
              className={styles.passwordRecovery__form__input}
              placeholder="Електронна пошта"
              value={formData.email}
              onChange={(event) => setFormData({
                ...formData,
                email: event.target.value,
              })}
              pattern={EmailValidation}
            />
            <Button
              size="large"
              nameClass="primary"
              className={styles.passwordRecovery__form__button}
              disabled={!Email.test(formData.email)}
              onClick={passwordRecovery}
            >
              Надіслати
            </Button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default PasswordRecovery;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './index.module.scss';
import { LoginParams } from '../../../hooks/All/useAuth';
import { AuthContext } from '../../../context/All/AuthContext';
import Layout from '../../../loyout/Layout';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/MyInput/Input';
import { Email, EmailValidation } from '../../../types/regExp';
import CheckBox from './MyCheckBox.module.scss';
import { Review } from '../../../components/common/Icons';

const Login = (): JSX.Element => {
  const { postLogin } = AuthContext();
  const [formData, setFormData] = useState<LoginParams>({ email: '', password: '' });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [check, setCheck] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = () => {
    setIsSubmitted(true);
    if (Email.test(formData.email) && formData.password.length > 7) {
      postLogin(formData, check);
    }
  };

  const PressEnter = (event:KeyboardEvent) => {
    if (event.keyCode === 13) {
      onSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', PressEnter);

    return () => {
      document.removeEventListener('keyup', PressEnter);
    };
  });

  return (
    <Layout>
      <div className={styles.login}>
        <div className={styles.login__div}>
          <div className={styles.login__form}>
            <Input
              className={styles.login__form__input}
              placeholder="Електронна адреса"
              value={formData.email}
              onChange={(event) => setFormData({
                ...formData,
                email: event.target.value,
              })}
              error={isSubmitted && !Email.test(formData.email)
                ? (formData.email.length < 1 ? 'E-mail не введено' : 'E-mail введено не вірно') : ''}
              pattern={EmailValidation}
            />

            <div className={styles.password}>
              <Input
                className={clsx(styles.login__form__input, styles.second_input)}
                inputType={isShowPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={formData.password}
                onChange={(event) => setFormData({
                  ...formData,
                  password: event.target.value,
                })}
                error={isSubmitted && formData.password?.length < 8 ? 'Пароль містить менше 8-ми символів' : ''}
              />
              <Button
                className={clsx(styles.show_pass, isShowPassword && styles.showPassword_active)}
                onClick={() => setIsShowPassword(!isShowPassword)}
                isImg
              >
                <Review />
              </Button>
            </div>
            <div className={styles.checkbox}>
              <input
                className={CheckBox.custom__CheckBox}
                checked={check}
                onChange={(event) => {
                  setCheck(event.target.checked);
                }}
                type="checkbox"
                id="MyCheckBox"
              />
              <label htmlFor="MyCheckBox">Зберегти дані</label>
            </div>
            <Button
              size="large"
              nameClass="primary"
              className={styles.login__form__button}
              onClick={onSubmit}
            >
              Вхід
            </Button>
            <Link to="/Password-recovery" className="LinkPasswordRecovery">Відновити пароль</Link>
          </div>
        </div>
      </div>
    </Layout>

  );
};

export default Login;

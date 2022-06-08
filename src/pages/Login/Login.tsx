import React, { useState } from 'react';
import styles from './login.module.scss';
import { LoginParams } from '../../hooks/Auth';
import Header from '../../components/Header/Header';
import { useAuthContext } from '../../context/useAuthContext';
import LoginModalAuth from '../../UI/LoginModalAuth/LoginModalAuth';

const Login = ({ children }:JSX.ElementChildrenAttribute):JSX.Element => {
  const { postLogin } = useAuthContext();
  const [credentials, setCredentials] = useState<LoginParams>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(true);

  const login = () => {
    postLogin(credentials);
  };

  const closeModalAuth = () => {
    setErrors(!errors);
  };

  return (
    <div className={styles.login}>

      <Header setOpen={() => undefined} isAuth />

      <LoginModalAuth errors={errors} closeModal={closeModalAuth}>
        Пароль абоE-mail введено не правильно
      </LoginModalAuth>

      <div className={styles.login__div}>
        <div className={styles.login__form}>
          <input
            className={styles.login__form__input}
            type="email"
            placeholder="Електронна адреса"
            value={credentials.email}
            onChange={(event) => setCredentials({
              ...credentials,
              email: event.target.value,
            })}
          />
          <input
            className={styles.login__form__input}
            type="password"
            placeholder="Пароль"
            value={credentials.password}
            onChange={(event) => setCredentials({
              ...credentials,
              password: event.target.value,
            })}
          />
          <label>
            <input className={styles.login__form__input} type="checkbox" name="SaveData" id="Зберегти дані" />
            Зберегти дані
          </label>
          <button
            type="submit"
            className={styles.login__form__button}
            disabled={!credentials.email || !credentials.password}
            onClick={login}
          >
            Вхід
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import { LoginParams } from '../../hooks/useAuth';
import Header from '../../components/Header';
import { useAuthContext } from '../../context/useAuthContext';

const Login = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const { postLogin } = useAuthContext();
  const [credentials, setCredentials] = useState<LoginParams>({
    email: '',
    password: '',
  });
  const [check, setCheck] = useState(true);

  const login = () => {
    if (parseInt(credentials.password, 10) >= 8) {
      postLogin(credentials, check);
    }
  };

  return (
    <div className={styles.login}>

      <Header setOpen={() => undefined} isAuth />

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
          <p
            className={clsx(
              styles.login__form__passwort,
              parseInt(credentials.password, 10) < 8 && styles.login__form__password__error,
            )}
          >
            Не менше 8 символів
          </p>
          <label>
            <input
              className={styles.login__form__input}
              checked={check}
              onChange={(event) => {
                setCheck(event.target.checked);
              }}
              type="checkbox"
              name="SaveData"
              id="Зберегти дані"
            />
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

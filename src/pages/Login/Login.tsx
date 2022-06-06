import React, { useEffect, useState } from 'react';
import styles from './login.module.scss';
import { useLogin } from '../../hooks/Auth';
import Header from '../../components/Header/Header';

const Login = ():JSX.Element => {
  const [{ userEmail, userPassword }, setCredentials] = useState({
    userEmail: '',
    userPassword: '',
  });
  const { postLogin } = useLogin();

  useEffect(() => {
    postLogin({ email: userEmail, password: userPassword });
  }, [userEmail, userEmail]);

  return (
    <div className={styles.login}>

      <Header setOpen={() => undefined} isAuth />

      <div className={styles.login__form}>
        <label>
          Email
          <input
            type="email"
            placeholder="Електронна адреса"
            value={userEmail}
            onChange={(event) => setCredentials({
              userEmail: event.target.value,
              userPassword,
            })}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Пароль"
            value={userPassword}
            onChange={(event) => setCredentials({
              userEmail,
              userPassword: event.target.value,
            })}
          />
        </label>
        <label>
          Зберегти дані
          <input type="checkbox" name="SaveData" id="Зберегти дані" />
        </label>
        <button type="submit" className={styles.login__button}>Вхід</button>
      </div>
    </div>
  );
};

export default Login;

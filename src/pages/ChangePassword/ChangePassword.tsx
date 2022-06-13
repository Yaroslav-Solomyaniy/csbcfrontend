import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './changePassword.module.scss';
import Header from '../../components/Header/Header';
import { useChangePassword } from '../../hooks/useAuth';
import leftArrow from '../../images/login/leftArrow.svg';

const ChangePassword = (): JSX.Element => {
  const navigate = useNavigate();
  const { patchChangePassword } = useChangePassword();
  const [credentials, setCredentials] = useState<{
    oldPassword: string;
    confirmedPassword: string;
  }>({
    oldPassword: '',
    confirmedPassword: '',
  });

  const [password, setPassword] = useState<{ password: string; }>({ password: '' });

  const changePassword = () => {
    patchChangePassword(password);
  };

  return (
    <div className={styles.changePassword}>

      <Header setOpen={() => undefined} isAuth={false} isRenderButtonMenu={false} />

      <button className={styles.changePassword__button} onClick={() => navigate(-1)} type="button">
        <img src={leftArrow} alt=" " />
        Повернутися
      </button>

      <div className={styles.changePassword__div}>
        <div className={styles.changePassword__form}>
          <h1 className={styles.changePassword__form__title}>Зміна паролю</h1>
          <input
            className={styles.changePassword__form__input}
            type="password"
            placeholder="Поточний пароль"
            value={credentials.oldPassword}
            onChange={(event) => setCredentials({
              ...credentials,
              oldPassword: event.target.value,
            })}
          />
          <input
            className={styles.changePassword__form__input}
            type="password"
            placeholder="Новий пароль"
            value={password.password}
            onChange={(event) => setPassword({
              password: event.target.value,
            })}
          />
          <input
            className={styles.changePassword__form__input}
            type="password"
            placeholder="Підтвердіть новий пароль"
            value={credentials.confirmedPassword}
            onChange={(event) => setCredentials({
              ...credentials,
              confirmedPassword: event.target.value,
            })}
          />
          <button
            type="submit"
            className={styles.changePassword__form__button}
            disabled={password.password === credentials.confirmedPassword}
            onClick={changePassword}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

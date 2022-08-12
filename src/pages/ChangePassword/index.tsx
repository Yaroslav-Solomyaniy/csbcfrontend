import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './index.module.scss';
import Header from '../../components/Header';
import { useChangePassword } from '../../hooks/useAuth';
import leftArrow from '../../images/login/leftArrow.svg';
import { useAuthContext } from '../../context/useAuthContext';
import stylesPortal from '../../stylesPortal.module.scss';
import ModalMessage from '../../components/common/ModalMessage';
import { useMessagesContext } from '../../context/useMessagesContext';

const ChangePassword = (): JSX.Element => {
  const { messages, closeError, closeWarning, closeInfo } = useMessagesContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { patchChangePassword } = useChangePassword();
  const [credentials, setCredentials] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmedPassword: string;
  }>({
    oldPassword: '',
    newPassword: '',
    confirmedPassword: '',
  });

  const changePassword = () => {
    patchChangePassword({
      password: credentials.newPassword,
      accessToken: user?.accessToken,
    });
  };

  return (
    <div className={styles.changePassword}>

      <Header setOpen={() => undefined} isRenderButtonMenu={false} />

      <div className={clsx(
        stylesPortal.portal__unauthorized,
        user && stylesPortal.portal__authorized,
        styles.changePassword__masseges,
      )}
      >
        {messages.error.map((error) => (
          <ModalMessage
            type="error"
            key={error.id}
            message={error.text}
            closeModal={() => {
              closeError(error.id);
            }}
          />
        ))}
        {messages.warning.map((warning) => (
          <ModalMessage
            type="warning"
            key={warning.id}
            message={warning.text}
            closeModal={() => {
              closeWarning(warning.id);
            }}
          />
        ))}
        {messages.info.map((info) => (
          <ModalMessage
            type="info"
            key={info.id}
            message={info.text}
            closeModal={() => {
              closeInfo(info.id);
            }}
          />
        ))}
      </div>
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
            value={credentials.newPassword}
            onChange={(event) => setCredentials({
              ...credentials,
              newPassword: event.target.value,
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
            disabled={!(credentials.newPassword === credentials.confirmedPassword)}
            onClick={() => changePassword()}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

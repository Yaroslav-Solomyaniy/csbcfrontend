import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './index.module.scss';
import Header from '../../../components/Header';
import { useChangePassword } from '../../../hooks/useAuth';
import leftArrow from '../../../images/login/leftArrow.svg';
import { useAuthContext } from '../../../context/useAuthContext';
import stylesPortal from '../../../stylesPortal.module.scss';
import ModalMessage from '../../../components/common/ModalMessage';
import { useMessagesContext } from '../../../context/messagesContext';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

interface IChangePassword{
  oldPassword: string;
  newPassword: string;
  confirmedPassword: string;
}
const initialFormData:IChangePassword = {
  oldPassword: '',
  newPassword: '',
  confirmedPassword: '',
};
const ChangePassword = (): JSX.Element => {
  const { patchChangePassword } = useChangePassword();
  const [formData, setFormData] = useState<IChangePassword>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { messages, closeError, closeWarning, closeInfo } = useMessagesContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = (e: (React.FormEvent<Element> | undefined)) => {
    setIsSubmitted(true);
    if (formData.oldPassword.length > 7
      && formData.newPassword.length > 7
      && formData.confirmedPassword.length > 7
      && (formData.newPassword === formData.confirmedPassword)) {
      patchChangePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        email: user?.email,
      });
      setIsSubmitted(false);
      setFormData(initialFormData);
    }
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
          <Input
            className={styles.changePassword__form__input}
            inputType="password"
            placeholder="Поточний пароль"
            value={formData.oldPassword}
            onChange={(event) => setFormData({
              ...formData,
              oldPassword: event.target.value,
            })}
            error={isSubmitted && formData.oldPassword?.length < 8 ? 'Поточний пароль містить менше 8-ми символів' : ''}
          />
          <Input
            className={styles.changePassword__form__input}
            inputType="password"
            placeholder="Новий пароль"
            value={formData.newPassword}
            onChange={(event) => setFormData({
              ...formData,
              newPassword: event.target.value,
            })}
            error={isSubmitted && formData.newPassword?.length < 8 ? 'Новий пароль містить менше 8-ми символів' : ''}
          />
          <Input
            className={styles.changePassword__form__input}
            inputType="password"
            placeholder="Підтвердіть новий пароль"
            value={formData.confirmedPassword}
            onChange={(event) => setFormData({
              ...formData,
              confirmedPassword: event.target.value,
            })}
            error={isSubmitted && formData.newPassword !== formData.confirmedPassword
              ? 'Підтверджуючий пароль введено невірно'
              : (isSubmitted && formData.confirmedPassword?.length < 8
                ? 'Підтверджуючий містить менше 8-ми символів' : '')}
          />
          <Button
            size="large"
            nameClass="primary"
            className={styles.changePassword__form__button}
            onClick={onSubmit}
          >
            Зберегти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

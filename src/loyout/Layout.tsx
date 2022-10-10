import React, { useState } from 'react';
import clsx from 'clsx';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import styles from '../components/Navigation/index.module.scss';
import { MessagesContext } from '../context/All/Messages';
import stylesPortal from '../stylesPortal.module.scss';
import { AuthContext } from '../context/All/AuthContext';
import ModalMessage from '../components/common/ModalMessage';
import { DeviceContext } from '../context/All/DeviceType';

const Layout = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(localStorage.getItem('open') === 'true');
  const { messages, closeError, closeWarning, closeInfo } = MessagesContext();
  const { user } = AuthContext();
  const { isDesktop, isTablet, isPhone } = DeviceContext();

  const setOpen = (): void => {
    setIsOpen(!isOpen);
    localStorage.setItem('open', `${!isOpen}`);
  };

  return (
    <>
      <Header setOpen={setOpen} isOpen={isOpen} />
      <div className={styles.nav_and_content}>
        {/* eslint-disable-next-line max-len */}
        {(user?.role === 'admin' || user?.role === 'student') && isDesktop && (<Navigation isOpen={isOpen} role={user.role} />)}
        <div className={clsx(isDesktop && styles.content, (isTablet || isPhone) && styles.content_mobile)}>
          <div className={clsx(
            stylesPortal.portal__unauthorized,
            (isTablet || isPhone) && stylesPortal.portal__unauthorized__mobile,
            user && stylesPortal.portal__authorized,
            ((isTablet || isPhone) && user) && stylesPortal.portal__authorized__mobile,
          )}
          >
            {messages.error.map((error) => (
              <ModalMessage
                type="error"
                key={error.id}
                id={error.id}
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
                id={warning.id}
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
                id={info.id}
                closeModal={() => {
                  closeInfo(info.id);
                }}
              />
            ))}

          </div>

          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;

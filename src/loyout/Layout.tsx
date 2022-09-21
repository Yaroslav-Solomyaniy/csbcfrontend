import React, { useState } from 'react';
import clsx from 'clsx';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import styles from '../components/Navigation/index.module.scss';
import { useMessagesContext } from '../context/messagesContext';
import stylesPortal from '../stylesPortal.module.scss';
import { useAuthContext } from '../context/useAuthContext';
import ModalMessage from '../components/common/ModalMessage';
import { useDeviceContext } from '../context/TypeDevice';

const Layout = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const { messages, closeError, closeWarning, closeInfo } = useMessagesContext();
  const { user } = useAuthContext();
  const { isDesktop } = useDeviceContext();

  const setOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header setOpen={setOpen} />
      <div className={styles.nav_and_content}>
        {(user?.role === 'admin' || user?.role === 'student') && isDesktop && (
        <Navigation isOpen={isOpen} role={user.role} />
        )}

        <div className={styles.content}>
          <div className={clsx(stylesPortal.portal__unauthorized, user && stylesPortal.portal__authorized)}>
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

          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;

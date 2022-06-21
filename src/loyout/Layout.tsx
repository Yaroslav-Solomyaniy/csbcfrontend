import React, { useState } from 'react';
import clsx from 'clsx';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import styles from '../components/Navigation/index.module.scss';
import { useMessagesContext } from '../context/useMessagesContext';
import stylesPortal from '../stylesPortal.module.scss';
import { useAuthContext } from '../context/useAuthContext';
import ModalMessage from '../components/common/ModalMessage';

const Layout = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, closeError } = useMessagesContext();
  const { user } = useAuthContext();
  const setOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header setOpen={setOpen} isAuth={!!user} />
      <div className={styles.nav_and_content}>
        {!!user && <Navigation isOpen={isOpen} />}
        <div className={styles.content}>
          <div id="modal" className={clsx(stylesPortal.portal__unauthorized, user && stylesPortal.portal__authorized)}>
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
            {messages.warning.map((error) => (
              <ModalMessage
                type="warning"
                key={error.id}
                message={error.text}
                closeModal={() => {
                  closeError(error.id);
                }}
              />
            ))}
            {messages.info.map((error) => (
              <ModalMessage
                type="info"
                key={error.id}
                message={error.text}
                closeModal={() => {
                  closeError(error.id);
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

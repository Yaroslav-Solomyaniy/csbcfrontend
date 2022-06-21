import React, { useState } from 'react';
import clsx from 'clsx';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import styles from '../components/Navigation/index.module.scss';
import { useMessagesContext } from '../context/useMessagesContext';
import stylesPortal from '../stylesPortal.module.scss';
import { useAuthContext } from '../context/useAuthContext';
import LoginModalAuth from '../components/common/LoginModalAuth';

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
            {messages.error.map((error, index) => (
              <LoginModalAuth
                key={error}
                error={error}
                closeModal={() => {
                  closeError(index);
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

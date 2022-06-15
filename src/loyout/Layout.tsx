import React, { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import styles from '../components/Navigation/index.module.scss';

const Layout = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header setOpen={setOpen} isAuth={false} />
      <div className={styles.nav_and_content}>
        <Navigation isOpen={isOpen} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;

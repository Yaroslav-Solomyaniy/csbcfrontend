import React, { useState } from 'react';
import clsx from 'clsx';
import logo from '../../images/logo.png';
import styles from './header.module.scss';
import buttonNav from '../../images/buttonNav.svg';

interface IHeader {
  setOpen: ()=> void;
  isAuth: boolean;
}

const Header = ({ setOpen, isAuth }:IHeader):JSX.Element => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__item}>
        {!isAuth && (
        <button
          className={clsx(styles.navigation__button, navOpen && styles.navigation__button__revert)}
          type="button"
          onClick={() => { setOpen(); setNavOpen(!navOpen); }}
        >
          <img src={buttonNav} alt="menu" />
        </button>
        )}
        <img className={styles.logo} src={logo} alt="logo" />
      </div>
      {!isAuth && (
      <div className={styles.header__item}>
        <span className={styles.user}>name</span>
        <button
          className={styles.avatar}
          type="button"
        >
          NV
        </button>
      </div>
      )}

    </header>
  );
};

export default Header;

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
  const [navOpen, setNavOpen] = useState(true);
  const [dropMenuOpen, setDropMenuOpen] = useState(false);

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
      <div className={styles.header__item} onClick={() => { setDropMenuOpen(!dropMenuOpen); }}>
        <span className={styles.user}>name</span>
        <button
          className={styles.avatar}
          type="button"
        >
          NV
        </button>
        <div className={clsx(styles.avatarka__modal, dropMenuOpen && styles.avatarka__modal__open)}>
          <a className={styles.avatarka__modal__item} href="/">
            <span className={styles.item__div}>змінити пароль</span>
          </a>
          <a className={styles.avatarka__modal__item} href="/">
            <span className={styles.item__div}>вихід</span>
          </a>
        </div>
      </div>
      )}

    </header>
  );
};

export default Header;

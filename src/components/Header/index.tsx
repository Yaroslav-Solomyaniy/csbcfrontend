import React, { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import styles from './index.module.scss';
import buttonNav from '../../images/buttonNav.svg';
import { useAuthContext } from '../../context/useAuthContext';

interface IHeader {
  setOpen: ()=> void;
  isAuth: boolean;
  isRenderButtonMenu?: boolean;
}

const Header = ({ setOpen, isAuth, isRenderButtonMenu = true }:IHeader):JSX.Element => {
  const [navOpen, setNavOpen] = useState(true);
  const [dropMenuOpen, setDropMenuOpen] = useState(false);
  const { logout } = useAuthContext();

  return (
    <header className={styles.header}>
      <div className={styles.header__item}>
        {isRenderButtonMenu && !isAuth && (
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
          <NavLink className={styles.avatarka__modal__item} to="/change-password">
            <span className={styles.avatarka__modal__item__span}>Змінити пароль</span>
          </NavLink>
          <button type="button" className={styles.avatarka__modal__item} onClick={logout}>
            <span className={styles.avatarka__modal__item__span}>Вихід</span>
          </button>
        </div>
      </div>
      )}

    </header>
  );
};

Header.defaultProps = {
  isRenderButtonMenu: true,
};

export default Header;

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import styles from './index.module.scss';
import buttonNav from '../../images/buttonNav.svg';
import { useAuthContext } from '../../context/useAuthContext';

interface IHeader {
  setOpen: () => void;
  isRenderButtonMenu?: boolean;
}

const Header = ({ setOpen, isRenderButtonMenu = true }: IHeader): JSX.Element => {
  const [navOpen, setNavOpen] = useState(true);
  const [dropMenuOpen, setDropMenuOpen] = useState(false);
  const { logout, user } = useAuthContext();

  return (
    <header className={styles.header}>
      <div className={styles.header__item}>
        {isRenderButtonMenu && (user?.role === 'admin' || user?.role === 'student') && (
          <button
            className={clsx(styles.navigation__button, navOpen && styles.navigation__button__revert)}
            type="button"
            onClick={() => {
              setOpen();
              setNavOpen(!navOpen);
            }}
          >
            <img src={buttonNav} alt="menu" />
          </button>
        )}
        <img className={styles.logo} src={logo} alt="logo" />
      </div>
      {user && (
        <button
          type="button"
          className={styles.header__item}
          onClick={() => {
            setDropMenuOpen(!dropMenuOpen);
          }}
        >
          <span className={styles.user}>
            {`${user?.lastName} ${user?.firstName?.[0].toUpperCase()}. ${user?.patronymic?.[0].toUpperCase()}.`}
          </span>
          <div className={styles.avatar}>
            {`${user?.firstName[0].toUpperCase()}${user?.patronymic[0].toUpperCase()}`}
          </div>
          <div className={clsx(styles.avatarka__modal, dropMenuOpen && styles.avatarka__modal__open)}>
            <NavLink className={styles.avatarka__modal__item} to="/change-password">
              <span className={styles.avatarka__modal__item__span}>Змінити пароль</span>
            </NavLink>
            <div
              className={styles.avatarka__modal__item}
              onClick={() => {
                logout();
                Navigate({ to: '/', replace: true });
              }}
            >
              <span className={styles.avatarka__modal__item__span}>Вихід</span>
            </div>
          </div>
        </button>
      )}

    </header>
  );
};

Header.defaultProps = {
  isRenderButtonMenu: true,
};

export default Header;

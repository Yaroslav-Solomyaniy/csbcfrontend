
import React, { useState } from 'react';
import clsx from 'clsx';
import logo from '../images/logo.png';
import styles from '../style/header.module.scss';
import buttonNav from '../images/buttonNav.svg';

interface IHeader {
  setOpen: ()=> void;
  isAuth: boolean;
}

const Header = ({ setOpen, isAuth }:IHeader):JSX.Element => {
  const [openModal, setOpenModal] = useState(false);

  const open = () => {
    setOpenModal(!openModal);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_item}>
        {!isAuth && (
          <button className={styles.navigationButton} type="button" onClick={setOpen}>
            <img src={buttonNav} alt="menu" />
          </button>
        )}
        <img className={styles.logo} src={logo} alt="logo" />
      </div>
      {!isAuth && (
        <div className={styles.header_item}>
          <span className={styles.user}>name</span>
          <button
            className={styles.avatarka}
            type="button"
            onClick={open}
          >
            NV
          </button>
          <div className={clsx(styles.avatarka__modal, openModal && styles.avatarka__modal__open)}>
            <div><a href="/login" className={styles.avatarka__modal__item}>змінити пароль</a></div>
            <div><a href="/login" className={styles.avatarka__modal__item}>вийти</a></div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;

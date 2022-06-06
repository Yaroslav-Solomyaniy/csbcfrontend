import React from 'react';
import logo from '../images/logo.png';
import styles from '../style/header.module.scss';
import buttonNav from '../images/buttonNav.svg';

interface IHeader {
  setOpen: ()=> void;
  isAuth: boolean;
}

const Header = ({ setOpen, isAuth }:IHeader):JSX.Element => (
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
        >
          NV
        </button>
      </div>
    )}

  </header>
);

export default Header;

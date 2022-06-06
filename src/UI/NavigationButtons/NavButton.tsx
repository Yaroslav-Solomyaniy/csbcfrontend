import React from 'react';
import styles from './navButton.module.scss';
import buttonNav from '../../images/buttonNav.svg';

const NavButton = ():JSX.Element => (
  <button className={styles.nav__button} type="button">
    <img src={buttonNav} alt="menu" />
  </button>
);

export default NavButton;

import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './navigationItem.module.scss';

export interface INavigationItem {
  title: string;
  to:string;
  ico: string;
  isOpen: boolean;
}

const NavigationItem = ({ title, to, ico, isOpen }: INavigationItem):JSX.Element => (
  <NavLink
    className={({ isActive }) => clsx(styles.link, styles.h42p, isActive && styles.Active, !isOpen && styles.hidden)}
    to={to}
  >
    <img className={styles.icon} src={ico} alt={title} />
    <span className={clsx(styles.title)}>{title}</span>
  </NavLink>
);

export default NavigationItem;

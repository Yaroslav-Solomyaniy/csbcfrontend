import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './index.module.scss';

export interface INavigationItemDesktop {
  title: string;
  to: string;
  ico: string | JSX.Element;
  isOpen: boolean;
}

const NavigationItemDesktop = ({ title, to, ico, isOpen }: INavigationItemDesktop): JSX.Element => (
  <NavLink
    className={({ isActive }) => clsx(styles.link, styles.h42p, isActive && styles.Active, !isOpen && styles.hidden)}
    to={to}
  >
    {typeof ico === 'string' ? (
      <img className={styles.icon} src={ico} alt={title} />
    ) : (
      ico
    )}
    <span className={clsx(styles.title)}>{title}</span>
  </NavLink>
);

export default NavigationItemDesktop;
import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from '../MenuLink.module.scss';
import { useDeviceContext } from '../../../../context/TypeDevice';

interface IDefaultMenuLink{
logout: ()=> void;
role: string;
}
const DefaultMenuLink = ({ logout, role }:IDefaultMenuLink):JSX.Element => {
  const { isPhone, isTablet } = useDeviceContext();

  return (
    <div className={clsx(((role === 'admin' || role === 'student') && (isPhone || isTablet)) && styles.defaultBorder)}>
      <NavLink className={styles.LinkItem} to="/change-password">
        <span className={styles.LinkItem_text}>Змінити пароль</span>
      </NavLink>
      <div
        className={styles.LinkItem}
        onClick={() => {
          logout();
          Navigate({ to: '/', replace: false });
        }}
      >
        <span className={styles.LinkItem_text}>Вихід</span>
      </div>
    </div>
  );
};

export default DefaultMenuLink;

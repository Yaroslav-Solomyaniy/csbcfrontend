import React from 'react';
import clsx from 'clsx';
import styles from './Menu.module.scss';
import { useDeviceContext } from '../../../context/TypeDevice';
import { useAuthContext } from '../../../context/useAuthContext';

interface IMenu{
  children:React.ReactNode | React.ReactChild;
  stateDropMenu: boolean;
}
const Menu = ({ children,
  stateDropMenu,
}:IMenu):JSX.Element => {
  const { isDesktop, isTablet, isPhone } = useDeviceContext();
  const { user } = useAuthContext();

  return (
    <div className={clsx(styles.overlay, stateDropMenu && styles.overlay_active)}>
      <div className={clsx(
        styles.DropMenu,
        // eslint-disable-next-line max-len
        user?.role === 'admin' && stateDropMenu && (isDesktop ? styles.DropMenu__active : ((isTablet || isPhone) && styles.DropMenu__active_mobileAdmin)),
        // eslint-disable-next-line max-len
        user?.role === 'student' && stateDropMenu && (isDesktop ? styles.DropMenu__active : ((isTablet || isPhone) && styles.DropMenu__active_mobileStudent)),
        (user?.role !== ('admin' || 'student') && stateDropMenu) && styles.DropMenu__active,
      )}
      >
        {children}
      </div>
    </div>
  );
};

export default Menu;
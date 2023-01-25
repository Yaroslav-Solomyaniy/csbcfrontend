import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Menu.module.scss';
import { DeviceContext } from '../../../../context/All/DeviceType';
import { AuthContext } from '../../../../context/All/AuthContext';

interface IMenu{
  children:React.ReactNode | React.ReactChild;
  stateDropMenu: boolean;
}
const Menu = ({ children,
  stateDropMenu,
}:IMenu):JSX.Element => {
  const [height, setHeight] = useState<number>(0);
  const { isDesktop, isTablet, isPhone, deviceSize } = DeviceContext();
  const { user } = AuthContext();

  useEffect(() => {
    const bodyStyle = document.body.style;

    if (stateDropMenu) {
      bodyStyle.overflowY = 'hidden';
    } else {
      bodyStyle.overflowY = 'auto';
    }
  }, [stateDropMenu]);

  useEffect(() => {
    if (deviceSize?.height) {
      setHeight(deviceSize.height);
    }
  }, [deviceSize?.height]);

  return (
    <>
      {isDesktop && (
      <div className={clsx(styles.DropMenu, stateDropMenu && styles.DropMenu__active)}>
        {children}
      </div>
      )}
      {(isPhone || isTablet) && (
        <div className={clsx(styles.overlay, stateDropMenu && styles.overlay_active)}>
          <div className={clsx(
            styles.DropMenu,
            // eslint-disable-next-line max-len
            user?.role === 'admin' && stateDropMenu && (height < 450 ? styles.DropMenu__active_mobileAdmin_mini : styles.DropMenu__active_mobileAdmin),
            user?.role === 'student' && stateDropMenu && styles.DropMenu__active_mobileStudent,
            user?.role !== ('admin' || 'student') && stateDropMenu && styles.DropMenu__active__mobile,
          )}
          >
            {children}
          </div>
        </div>
      )}
    </>

  );
};

export default Menu;

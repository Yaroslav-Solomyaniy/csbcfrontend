import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface IMobileModalWindow{
  isActive: boolean;
  children: React.ReactNode | React.ReactChild;
}

const MobileModalWindow = ({ isActive, children }:IMobileModalWindow) => (
  <div className={clsx(styles.overlay, isActive && styles.overlay_active)}>
    <div className={clsx(styles.modal, isActive && styles.modal_active)}>
      {children}
    </div>
  </div>
);

export default MobileModalWindow;

import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '../Button';
import styles from './index.module.scss';
import { Dots } from '../Icons';
import useOnClickOutside from '../../../hooks/All/UseClickOutsideElement';

interface IAdaptiveTableModalButtons{
children: React.ReactNode | React.ReactChild;
}

const AdaptiveTableModalButtons = ({ children }:IAdaptiveTableModalButtons) => {
  const [activeControl, setActiveControl] = useState<boolean>(false);
  const control = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  useOnClickOutside(control, () => setActiveControl(false));

  return (
    <>
      <Button
        className={clsx(styles.Dots, activeControl && styles.DotsNoDisplay)}
        onClick={() => setActiveControl(true)}
      >
        <Dots />
      </Button>
      <div ref={control} className={clsx(styles.displayButtons, activeControl && styles.displayButtonsActive)}>
        {children}
      </div>
    </>
  );
};

export default AdaptiveTableModalButtons;

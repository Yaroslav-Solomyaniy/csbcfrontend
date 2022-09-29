import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '../Button';
import styles from './styles.module.scss';
import { Dots } from '../Icon';
import useOnClickOutside from '../../../hooks/UseClickOutsideElement';

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
      <div ref={control} className={clsx(styles.ModalControl, activeControl && styles.ModalControlActive)}>
        {children}
      </div>
    </>
  );
};

export default AdaptiveTableModalButtons;

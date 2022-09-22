import React, { useEffect } from 'react';
import clsx from 'clsx';
import Button from '../Button';
import styles from './styles.module.scss';
import { Dots } from '../Icon';
import useOnClickOutside from '../../../hooks/UseClickOutsideElement';

interface IMobileElementMenuControl{
children: React.ReactNode | React.ReactChild;
activeControl: boolean;
setActiveControl: (value: boolean) => void;
isActiveModal: Record<string, number | boolean>;
}

const MobileElementMenuControl = ({
  children, activeControl, setActiveControl, isActiveModal }:IMobileElementMenuControl) => {
  useEffect(() => {
    setActiveControl(false);
  }, [isActiveModal]);

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

export default MobileElementMenuControl;

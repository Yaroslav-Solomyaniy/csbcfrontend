import clsx from 'clsx';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './modalWindow.module.scss';

interface ImodalWindow{
  modalTitle:string;
  active:boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode | React.ReactChild;
}

const ModalWindow = ({ modalTitle, active, setActive, children }:ImodalWindow):JSX.Element => (
  <div className={clsx(styles.modal, active && styles.active)} onClick={() => { setActive(false); }}>
    <div className={clsx(styles.modal__content, active && styles.active)} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modal__container}>
        <div className={styles.modal__title}>{modalTitle}</div>
        {children}
      </div>
    </div>
  </div>
);

export default ModalWindow;

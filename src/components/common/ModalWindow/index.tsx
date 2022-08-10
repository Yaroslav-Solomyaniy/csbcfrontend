import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

interface ImodalWindow {
  modalTitle: string;
  active: boolean;
  children: React.ReactNode | React.ReactChild;
  closeModal: () => void;
}

const ModalWindow = ({ modalTitle, active, children, closeModal }: ImodalWindow): JSX.Element => (
  <div className={clsx(styles.modal, active && styles.active)} onClick={closeModal}>
    <div className={clsx(styles.modal__content, active && styles.active)} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modal__container}>
        <div className={styles.modal__title}>{modalTitle}</div>
        {children}
      </div>
    </div>
  </div>
);

export default ModalWindow;

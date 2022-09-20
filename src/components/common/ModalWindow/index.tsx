import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';
import { useDeviceContext } from '../../../context/TypeDevice';

interface IModalWindow {
  modalTitle: string;
  active: boolean;
  children: React.ReactNode | React.ReactChild;
  closeModal: () => void;
  overflowY?: boolean;
}

const ModalWindow = ({ modalTitle, active, children, closeModal, overflowY }: IModalWindow): JSX.Element => (
  <div className={clsx(styles.modal, active && styles.active)} onClick={closeModal}>
    <div
      className={clsx(styles.modal__content, active && styles.active, overflowY && styles.modal__overflow)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.modal__container}>
        <div className={styles.modal__title}>{modalTitle}</div>
        {children}
      </div>
    </div>
  </div>
);

ModalWindow.defaultProps = {
  overflowY: false,
};
export default ModalWindow;

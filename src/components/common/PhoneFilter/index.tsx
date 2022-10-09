import React from 'react';
import style from './index.module.scss';
import Button from '../Button';
import { ArrowLeft } from '../Icons';
import ModalWindow from '../ModalWindow';

interface IPhoneFilter {
  closeModal: () => void;
  isActive: boolean;
  children: React.ReactChild | React.ReactNode;
  modalTitle: string;
}

const PhoneFilter = ({ children, modalTitle, closeModal, isActive }: IPhoneFilter) => (
  <ModalWindow modalTitle={modalTitle} active={isActive} closeModal={closeModal}>
    <div className={style.Title} onClick={closeModal}>
      <ArrowLeft />
    </div>

    <div className={style.filterRow}>
      {children}
    </div>
    <Button onClick={closeModal} nameClass="primary" size="large" className={style.Button}>Застосувати</Button>
  </ModalWindow>
);

export default PhoneFilter;

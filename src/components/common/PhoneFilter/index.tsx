import React from 'react';
import FilterTeacherPage from '../../../pages/Teacher/components/FilterTeacherPage';
import style from './index.module.scss';
import Button from '../Button';
import { ArrowLeft } from '../Icon';
import MobileModalWindow from '../MobileModalWindow';
import { IParams } from '../../../pages/Teacher';

interface IPhoneFilter {
  closeModal: () => void;
  isActive: boolean;
  children: React.ReactChild | React.ReactNode;
}

const PhoneFilter = ({ children, closeModal, isActive }: IPhoneFilter) => (
  <MobileModalWindow isActive={isActive}>
    <div className={style.Title} onClick={closeModal}>
      <ArrowLeft />
      <div className={style.Text}>Фільтр</div>
    </div>

    <div className={style.filterRow}>
      {children}
    </div>
    <Button onClick={closeModal} nameClass="primary" size="large" className={style.Button}>Застосувати</Button>
  </MobileModalWindow>
);

export default PhoneFilter;

import React from 'react';
import FilterTeacherPage from '../../../pages/Teacher/components/FilterTeacherPage';
import style from './index.module.scss';
import Button from '../Button';
import { ArrowLeft } from '../Icon';
import MobileModalWindow from '../MobileModalWindow';

interface IPhoneFilter {
  params: any;
  setParams: (value: any) => void;
  closeModal: () => void;
  isActive: boolean;
}

const PhoneFilter = ({ params, setParams, closeModal, isActive }: IPhoneFilter) => (
  <MobileModalWindow isActive={isActive}>
    <div className={style.Title} onClick={closeModal}>
      <ArrowLeft />
      <div className={style.Text}>Фільтр</div>
    </div>

    <div className={style.filterRow}>
      <FilterTeacherPage value={params} setParams={setParams} />
    </div>
    <Button onClick={closeModal} nameClass="primary" size="large" className={style.Button}>Застосувати</Button>
  </MobileModalWindow>
);

export default PhoneFilter;

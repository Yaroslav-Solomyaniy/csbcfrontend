import React, { useState } from 'react';
import clsx from 'clsx';
import PageFilter from './components/PageFilter';
import { IParams } from './index';
import styles from '../pagesStyle.module.scss';
import style from './PhoneFilter.module.scss';
import Button from '../../components/common/Button';
import { ArrowLeft } from '../../components/common/Icon';

interface IPhoneFilter{
  params: IParams;
  setParams: (value: IParams) => void;
  closeModal: () => void;
  isActive: boolean;
  title: string;
}
const PhoneFilter = ({ title, params, setParams, closeModal, isActive }:IPhoneFilter) => (
  <div className={clsx(styles.newModal, isActive && styles.active)}>
    <div className={style.Title} onClick={closeModal}>
      <ArrowLeft />
      <div className={style.Text}>
        {title}
      </div>
    </div>

    <div className={style.filterRow}>
      <PageFilter value={params} setParams={setParams} />
    </div>
    <Button onClick={closeModal} nameClass="primary" size="large" className={style.Button}>Застосувати</Button>
  </div>
);

export default PhoneFilter;

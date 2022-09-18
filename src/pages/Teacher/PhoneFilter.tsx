import React from 'react';
import PageFilter from './components/PageFilter';
import { IParams } from './index';
import styles from '../pagesStyle.module.scss';
import mystyle from './PhoneFilter.module.scss';
import Button from '../../components/common/Button';

interface IPhoneFilter{
  params: IParams;
  setParams: (value: IParams) => void;
  closeModal: () => void;
  title: string;
}
const PhoneFilter = ({ title, params, setParams, closeModal }:IPhoneFilter) => (
  <div className={styles.newModal}>
    <h1 className={mystyle.Title}>{title}</h1>
    <div className={mystyle.filterRow}>
      <PageFilter value={params} setParams={setParams} />
    </div>
    <Button onClick={closeModal} nameClass="primary" size="large" className={mystyle.Button}>Застосувати</Button>
  </div>
);

export default PhoneFilter;

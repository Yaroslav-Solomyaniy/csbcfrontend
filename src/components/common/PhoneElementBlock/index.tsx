import React from 'react';
import styles from './index.module.scss';

interface IPhoneElementBlock{
children: React.ReactChild | React.ReactNode;
key: number | string;
}

const PhoneElementBlock = ({ children, key }:IPhoneElementBlock) => (
  <div key={key} className={styles.block}>
    {children}

  </div>
);

export default PhoneElementBlock;

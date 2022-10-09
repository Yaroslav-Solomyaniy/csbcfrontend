import React from 'react';
import styles from './index.module.scss';
import loader from '../../../images/Subtract.png';

const Preloader = () => (
  <div className={styles.loader}>
    <img src={loader} alt="hi" className={styles.svg} />
  </div>
);

export default Preloader;

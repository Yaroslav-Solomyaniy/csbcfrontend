import React from 'react';
import styles from './index.module.scss';
import loader from '../../../assets/images/Loader.png';

const Preloader = () => (
  <div className={styles.loader}>
    <img src={loader} alt="hi" className={styles.svg} />
    {/* <svg className={styles.svg} viewBox="0 0 100 100"> */}

    {/*  <clipPath id="clip"> */}
    {/*    <path d="M 50 0 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100 v 8 a 42 42 0 0 0 0 84 42 42 0 0 0 0 -84" /> */}
    {/*  </clipPath> */}

    {/*  <foreignObject x="0" y="0" width="100" height="100" clipPath="url(#clip)"> */}
    {/*    <div className={styles.gradient} /> */}
    {/*  </foreignObject> */}
    {/* </svg> */}
  </div>
);

export default Preloader;

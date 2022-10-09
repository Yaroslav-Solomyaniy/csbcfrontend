import React from 'react';
import styles from './index.module.scss';

const Preloader = () => (
  <div className={styles.loader}>
    <svg className={styles.svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.00012207 12C0.00012207 18.6274 5.37271 24 12.0001 24C18.6275 24 24.0001 18.6274 24.0001 12C24.0001 5.37258 18.6275 0 12.0001 0C5.37271 0 0.00012207 5.37258 0.00012207 12ZM2.00012 12C2.00012 17.5228 6.47728 22 12.0001 22C17.523 22 22.0001 17.5228 22.0001 12C22.0001 6.47715 17.523 2 12.0001 2C6.47728 2 2.00012 6.47715 2.00012 12Z" fill="url(#paint0_angular_5399_1074)" />
      <defs>
        <radialGradient id="paint0_angular_5399_1074" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.0001 12) rotate(90) scale(12)">
          <stop stopColor="#428BCA" />
          <stop offset="0.0001" stopColor="#3AE180" stopOpacity="0" />
          <stop offset="1" stopColor="#428BCA" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export default Preloader;

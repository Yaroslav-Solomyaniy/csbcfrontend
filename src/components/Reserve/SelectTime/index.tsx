import React, { FC, useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import Button from '../../common/Button';
import arrow from '../../../assets/images/arrow.svg';

const SelectTime: FC = () => {
  const hoursList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const minList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
    56, 57, 58, 59];
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMin, setCurrentMin] = useState(0);
  const [activeBox, setActiveBox] = useState(false);

  const implementHours = () => {
    if (currentHours === 23) {
      setCurrentHours(0);
    } else {
      setCurrentHours(hoursList[currentHours + 1]);
    }
  };
  const dekrementHours = () => {
    if (currentHours === 0) {
      setCurrentHours(23);
    } else {
      setCurrentHours(hoursList[currentHours - 1]);
    }
  };
  const validInputHourse = (e: any) => {
    if (hoursList.includes(+e.target.value)) {
      setCurrentHours(+e.target.value);
    }
  };

  const implementMinutes = () => {
    if (currentMin === 59) {
      setCurrentMin(0);
    } else {
      setCurrentMin(minList[currentMin + 1]);
    }
  };
  const dekrementMinutes = () => {
    if (currentMin === 0) {
      setCurrentMin(59);
    } else {
      setCurrentMin(minList[currentMin - 1]);
    }
  };
  const validInputMinutes = (e: any) => {
    if (minList.includes(+e.target.value)) {
      setCurrentMin(+e.target.value);
    }
  };

  const showbox = () => {
    setActiveBox(true);
  };

  return (
    <>
      <div className={styles.displayTIme} onClick={showbox}>
        {currentHours.toString().length === 1 ? `0${currentHours}` : currentHours}
        {' '}
        :
        {' '}
        {currentMin.toString().length === 1 ? `0${currentMin}` : currentMin}
      </div>
      {/*-------------------------------------------*/}
      {/*   <div className={styles.miniModal}> */}
      <div className={clsx(styles.selectBlock, activeBox && styles.show)} onClick={(e) => e.stopPropagation()}>
        <div className={styles.selectBlockBody}>
          <div className={styles.select}>
            <Button isImg onClick={implementHours} className={styles.addHours} type="button">
              <img src={arrow} className={styles.addHoursArrow} alt="Добавить" />
            </Button>
            <input className={styles.infoValue} value={currentHours} onChange={validInputHourse} />
            <Button isImg onClick={dekrementHours} className={styles.removeHours} type="button">
              <img src={arrow} className={styles.removeHoursArrow} alt="Убавить" />
            </Button>
          </div>
          {/*-------------------------------------------*/}
          <h3 className={styles.twoDots}>:</h3>
          {/*-------------------------------------------*/}
          <div className={styles.select}>
            <Button isImg onClick={implementMinutes} className={styles.addHours} type="button">
              <img src={arrow} className={styles.addHoursArrow} alt="Добавить" />
            </Button>
            <input className={styles.infoValue} value={currentMin} onChange={validInputMinutes} />
            <Button isImg onClick={dekrementMinutes} className={styles.removeHours} type="button">
              <img src={arrow} className={styles.removeHoursArrow} alt="Убавить" />
            </Button>
          </div>
        </div>
      </div>
      {/*      </div> */}
    </>
  );
};

export default SelectTime;

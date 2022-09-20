import React from 'react';
import PhoneElementBlock from '../../../../components/common/PhoneElementBlock';
import styles from '../index.module.scss';

interface IMobileElementRatingHistory{
  id: number;
  key: number;
  date: string;
  grade: number;
  reasonOfChange: string;
  lastName: string;
  firstName: string;
  patronymic: string;
}

const MobileElementRatingHistory = ({ id,
  date,
  key,
  grade,
  patronymic,
  reasonOfChange,
  lastName,
  firstName }:IMobileElementRatingHistory):JSX.Element => (
    <PhoneElementBlock key={key}>
      <div className={styles.content}>
        <h1 className={styles.Phone__title}>{`${lastName} ${firstName} ${patronymic}`}</h1>
        <h6 className={styles.Phone__subtitle}>{`Дата зміни: ${date}`}</h6>
        <h6 className={styles.Phone__subtitle}>{`Оцінка: ${grade}`}</h6>
        <h6 className={styles.Phone__subtitle}>{`Причина зміни: ${reasonOfChange}`}</h6>
      </div>
    </PhoneElementBlock>
);

export default MobileElementRatingHistory;

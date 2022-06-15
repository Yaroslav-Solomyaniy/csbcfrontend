import React from 'react';
import styles from './index.module.scss';
import first from '../../../../images/table/first.svg';
import prev from '../../../../images/table/prev.svg';
import next from '../../../../images/table/next.svg';
import last from '../../../../images/table/last.svg';
import Button from '../../Button';

const TableFooter = (): JSX.Element => (
  <div className={styles.footer}>
    <label className={styles.footer__lable}>Рядків на сторінці</label>
    <select className={styles.footer__select}>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="30">30</option>
    </select>
    <div className={styles.footer__info}>currentPage*itemsPerPage | 1 - itemCount з totalItems</div>
    <div className={styles.footer__buttons}>
      <Button className={styles.footer__buttons_first} onClick={() => console.log('first')}>
        <img src={first} alt="" />
      </Button>
      <Button className={styles.footer__buttons_prev} onClick={() => console.log('prev')}>
        <img src={prev} alt="" />
      </Button>
      <Button className={styles.footer__buttons_next} onClick={() => console.log('next')}>
        <img src={next} alt="" />
      </Button>
      <Button className={styles.footer__buttons_last} onClick={() => console.log('last')}>
        <img src={last} alt="" />
      </Button>
    </div>
  </div>
);

export default TableFooter;

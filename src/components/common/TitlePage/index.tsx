import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import { DeviceContext } from '../../../context/All/DeviceType';
import { Filter } from '../Icons';

interface ITitlePage {
  title: string;
  action?: JSX.Element;
  setIsActiveModal?: (value: Record<string, number | boolean>) => void;
}

const TitlePage = ({ title, action, setIsActiveModal }: ITitlePage):JSX.Element => {
  const { isDesktop, isTablet, isPhone } = DeviceContext();

  return (
    <>
      {isDesktop && (
        <div className={styles.top_row}>
          <h1 className={styles.title}>{title}</h1>
          {action}
        </div>
      )}
      {isTablet && (
        <div className={styles.top_row}>
          <h1 className={styles.title}>{title}</h1>
          {action}
        </div>
      )}

      {isPhone && (
        <div className={clsx(styles.top_row_mobile)}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <h1
            className={styles.title_mobile}
            onClick={() => setIsActiveModal ? setIsActiveModal({ filter: true }) : undefined}
          >
            <Filter />
            {title}
          </h1>
          {action && <div className={styles.isAction}>{action}</div> }
        </div>
      )}
    </>
  );
};

TitlePage.defaultProps = {
  action: '',
  isActiveModal: false,
  setIsActiveModal: () => undefined,
};

export default TitlePage;
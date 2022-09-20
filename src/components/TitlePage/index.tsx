import React from 'react';
import styles from './index.module.scss';
import { useDeviceContext } from '../../context/TypeDevice';
import { Filter } from '../common/Icon';

interface ITitlePage {
  title: string;
  action?: JSX.Element;
  setIsActiveModal?: (value: Record<string, number | boolean>) => void;
}

const TitlePage = ({ title, action, setIsActiveModal }: ITitlePage):JSX.Element => {
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

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
        <div className={styles.top_row}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <h1
            className={styles.title}
            onClick={() => setIsActiveModal ? setIsActiveModal({ filter: true }) : undefined}
          >
            <Filter />
            {title}
          </h1>
          {action}
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

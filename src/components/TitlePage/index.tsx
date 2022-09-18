import React from 'react';
import styles from './index.module.scss';
import { useDeviceContext } from '../../context/TypeDevice';
import Button from '../common/Button';
import { IIsActiveModalState } from '../../pages/Teacher';
import { Filter } from '../common/Icon';

interface ITitlePage {
  title: string;
  action?: JSX.Element;
  isActiveModal?: IIsActiveModalState;
  setIsActiveModal?: (value: any) => void;
}

const TitlePage = ({ title, action, isActiveModal, setIsActiveModal }: ITitlePage):JSX.Element => {
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  return (
    <>
      {(isDesktop || isTablet) && (
        <div className={styles.top_row}>
          <h1 className={styles.title}>{title}</h1>
          {action}
        </div>
      )}
      {isPhone && (
        <div className={styles.top_row}>

          <h1
            className={styles.title}
            onClick={() => setIsActiveModal ? setIsActiveModal({ ...isActiveModal, filter: true }) : undefined}
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

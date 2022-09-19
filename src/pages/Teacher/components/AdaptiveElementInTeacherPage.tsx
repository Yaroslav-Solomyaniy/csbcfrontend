import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './AdaptiveElementInTeacherPage.module.scss';
import Button from '../../../components/common/Button';
import { Dots } from '../../../components/common/Icon';
import ItemButtons from './ItemButtons';
import { useDeviceContext } from '../../../context/TypeDevice';
import { IIsActiveModalState } from '../index';
import useOnClickOutside from '../../../hooks/UseClickOutsideElement';

interface IAdaptiveElementInTeacherPage{
  id: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  groupName: string;
  courseName: string;
  grade: number;
  isActiveModal: IIsActiveModalState;
  setIsActiveModal: (value: IIsActiveModalState) => void;
}
const AdaptiveElementInTeacherPage = ({ id,
  courseName,
  groupName,
  lastName,
  firstName,
  grade,
  patronymic, isActiveModal, setIsActiveModal }:IAdaptiveElementInTeacherPage):JSX.Element => {
  const [activeControl, setActiveControl] = useState<boolean>(false);
  const { isTablet, isPhone } = useDeviceContext();

  useEffect(() => {
    setActiveControl(false);
  }, [isActiveModal]);

  const control = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  useOnClickOutside(control, () => setActiveControl(false));

  return (
    <>
      {isTablet && (
        <div key={id} className={styles.block}>
          <div className={styles.content}>
            <h1 className={styles.Tablet__title}>
              {`${lastName} ${firstName} ${patronymic}, ${groupName}`}
            </h1>
            <h6 className={styles.Tablet__subtitle}>{`Предмет: ${courseName}`}</h6>
            <h6 className={styles.Tablet__subtitle}>{`Оцінка: ${grade}`}</h6>
          </div>
          <div className={styles.buttons}>
            <ItemButtons isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={id} />
          </div>
        </div>
      )}

      {isPhone && (
        <div key={id} className={styles.block}>
          <div className={styles.content}>
            <h1 className={styles.Phone__title}>{`${lastName} ${firstName} ${patronymic}`}</h1>

            <h6 className={styles.Phone__subtitle}>{`Група: ${groupName}`}</h6>
            <h6 className={styles.Phone__subtitle}>{`Предмет: ${courseName}`}</h6>
            <h6 className={styles.Phone__subtitle}>{`Оцінка: ${grade}`}</h6>
          </div>

          <Button
            className={clsx(styles.Dots, activeControl && styles.DotsNoDisplay)}
            onClick={() => setActiveControl(true)}
          >
            <Dots />
          </Button>
          <div ref={control} className={clsx(styles.ModalControl, activeControl && styles.ModalControlActive)}>
            <ItemButtons isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={id} />
          </div>
        </div>
      )}
    </>

  );
};

export default AdaptiveElementInTeacherPage;

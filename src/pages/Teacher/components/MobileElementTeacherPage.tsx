import React, { useState } from 'react';
import { useDeviceContext } from '../../../context/TypeDevice';
import { EditAndHistory } from '../../../components/common/GroupButtons';
import PhoneElementBlock from '../../../components/common/PhoneElementBlock';
import TableMenuControl from '../../../components/common/TableMenuControl';
import styles from '../../MobileElement.module.scss';

interface IMobileElementTeacherPage{
  id: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  groupName: string;
  courseName: string;
  grade: number;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}
const MobileElementTeacherPage = ({ id,
  courseName,
  groupName,
  lastName,
  firstName,
  grade,
  patronymic, isActiveModal, setIsActiveModal }:IMobileElementTeacherPage):JSX.Element => {
  const { isTablet, isPhone } = useDeviceContext();
  const [activeControl, setActiveControl] = useState<boolean>(false);

  return (
    <>
      {isTablet && (
      <PhoneElementBlock key={id}>
        <div className={styles.content}>
          <h1 className={styles.Tablet__title}>
            {`${lastName} ${firstName} ${patronymic}, ${groupName}`}
          </h1>
          <h6 className={styles.Tablet__subtitle}>{`Предмет: ${courseName}`}</h6>
          <h6 className={styles.Tablet__subtitle}>{`Оцінка: ${grade}`}</h6>
        </div>
        <div className={styles.buttons}>
          <EditAndHistory isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={id} />
        </div>
      </PhoneElementBlock>
      )}

      {isPhone && (
        <PhoneElementBlock key={id}>
          <div className={styles.content}>
            <h1 className={styles.Phone__title}>{`${lastName} ${firstName} ${patronymic}`}</h1>

            <h6 className={styles.Phone__subtitle}>{`Група: ${groupName}`}</h6>
            <h6 className={styles.Phone__subtitle}>{`Предмет: ${courseName}`}</h6>
            <h6 className={styles.Phone__subtitle}>{`Оцінка: ${grade}`}</h6>
          </div>

          <TableMenuControl
            activeControl={activeControl}
            setActiveControl={setActiveControl}
            isActiveModal={isActiveModal}
          >
            <EditAndHistory
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
              itemId={id}
            />
          </TableMenuControl>
        </PhoneElementBlock>
      )}
    </>

  );
};

export default MobileElementTeacherPage;

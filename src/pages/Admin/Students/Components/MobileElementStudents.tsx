import React, { useState } from 'react';
import { useDeviceContext } from '../../../../context/TypeDevice';

import styles from '../../../MobileElement.module.scss';
import { EditReviewDelete } from '../../../../components/common/GroupButtons';
import TableMenuControl from '../../../../components/common/AdaptiveTableModalButtons';
import { IStudentData } from '../../../../hooks/useStudents';

interface IMobileElementStudents{
  obj: IStudentData;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value:Record<string, number | boolean>) => void;
}
const MobileElementStudents = ({ obj,
  isActiveModal,
  setIsActiveModal,
}:IMobileElementStudents) => {
  const { isTablet, isPhone } = useDeviceContext();
  const [activeControl, setActiveControl] = useState<boolean>(false);

  return (
    <div key={obj.id}>
      <div className={styles.content}>
        <h1 className={styles.Tablet__title}>
          {`${obj.user.lastName} ${obj.user.firstName} ${obj.user.patronymic}`}
        </h1>
        <h6 className={styles.Tablet__subtitle}>{`Група: ${obj.group.name}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`Номер наказу: ${obj.orderNumber}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`Форма навчання: ${obj.isFullTime ? 'Денна' : 'Заочна'}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`E-mail: ${obj.orderNumber}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`ЄДЕБО: ${obj.edeboId}`}</h6>

      </div>

      {isTablet && (
        <div className={styles.buttons}>
          <EditReviewDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={obj.id} />
        </div>
      )}
      {isPhone && (
        <TableMenuControl>
          <EditReviewDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={obj.id} />
        </TableMenuControl>
      )}
    </div>
  );
};

export default MobileElementStudents;

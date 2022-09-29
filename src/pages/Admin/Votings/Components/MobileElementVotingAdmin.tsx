import React, { useState } from 'react';
import { useDeviceContext } from '../../../../context/TypeDevice';

import styles from '../../../MobileElement.module.scss';
import { EditDeleteReviewApprove } from '../../../../components/common/GroupButtons';
import TableMenuControl from '../../../../components/common/AdaptiveTableModalButtons';
import { IGetVotingAdminData } from '../../../../hooks/useVotingAdmin';

interface IMobileElementVotingAdmin{
  obj: IGetVotingAdminData;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value:Record<string, number | boolean>) => void;
}
const MobileElementVotingAdmin = ({ obj,
  isActiveModal,
  setIsActiveModal,
}:IMobileElementVotingAdmin) => {
  const { isTablet, isPhone } = useDeviceContext();
  const [activeControl, setActiveControl] = useState<boolean>(false);

  return (
    <div key={obj.id}>
      <div className={styles.content}>
        <h1 className={styles.Tablet__title}>{obj.groups.map((group) => group.name).join(', ')}</h1>
        <h6 className={styles.Tablet__subtitle}>{`Дата початку: ${new Date(obj.startDate).toLocaleString()}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`Дата кінця: ${new Date(obj.endDate).toLocaleString()}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`Проголосували: ${obj.tookPart} / ${obj.allStudents}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`Статус: ${obj.status}`}</h6>
      </div>

      {isTablet && (
        <div className={styles.buttons}>
          <EditDeleteReviewApprove isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={obj.id} />
        </div>
      )}
      {isPhone && (
        <TableMenuControl>
          <EditDeleteReviewApprove isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={obj.id} />
        </TableMenuControl>
      )}
    </div>
  );
};

export default MobileElementVotingAdmin;

import React, { useState } from 'react';
import PhoneElementBlock from '../../../components/common/PhoneElementBlock';
import { useDeviceContext } from '../../../context/TypeDevice';
import styles from '../../MobileElement.module.scss';
import { EditAndDelete } from '../../../components/common/GroupButtons';
import TableMenuControl from '../../../components/common/TableMenuControl';

interface IMobileElementGroupPageAdmin{
  id: number;
  groupName: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  students: number;
  orderNumber: string;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}

const MobileElementGroupPageAdmin = ({ id,
  groupName,
  firstName,
  patronymic,
  lastName,
  orderNumber,
  students, isActiveModal, setIsActiveModal,
}:IMobileElementGroupPageAdmin) => {
  const { isTablet, isPhone } = useDeviceContext();
  const [activeControl, setActiveControl] = useState<boolean>(false);

  return (
    <PhoneElementBlock key={id}>
      <div className={styles.content}>
        <h1 className={styles.Tablet__title}>{groupName}</h1>
        <h6 className={styles.Tablet__subtitle}>
          {`Куратор: ${lastName} ${firstName} ${patronymic}`}
        </h6>
        <h6 className={styles.Tablet__subtitle}>{`Номер наказу: ${orderNumber}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`К-ть студентів: ${students}`}</h6>
      </div>

      {isTablet && (
        <div className={styles.buttons}>
          <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={id} />
        </div>
      )}
      {isPhone && (
        <TableMenuControl
          activeControl={activeControl}
          setActiveControl={setActiveControl}
          isActiveModal={isActiveModal}
        >
          <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={id} />
        </TableMenuControl>
      )}
    </PhoneElementBlock>
  );
};

export default MobileElementGroupPageAdmin;
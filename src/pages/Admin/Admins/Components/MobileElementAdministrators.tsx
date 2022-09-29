import React, { useState } from 'react';
import { useDeviceContext } from '../../../../context/TypeDevice';
import styles from '../../../MobileElement.module.scss';
import { EditAndDelete } from '../../../../components/common/GroupButtons';
import TableMenuControl from '../../../../components/common/AdaptiveTableModalButtons';

interface IMobileElementAdministrators{
  id: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  email: string;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value:Record<string, number | boolean>) => void;
}
const MobileElementAdministrators = ({ id,
  lastName,
  firstName,
  patronymic,
  email,
  isActiveModal,
  setIsActiveModal,
}:IMobileElementAdministrators) => {
  const { isTablet, isPhone } = useDeviceContext();

  return (
    <div />
    // <div key={id}>
    //   <div className={styles.content}>
    //     <h1 className={styles.Tablet__title}>
    //       {`${lastName} ${firstName} ${patronymic}`}
    //     </h1>
    //     <h6 className={styles.Tablet__subtitle}>{`Email: ${email}`}</h6>
    //   </div>
    //
    //   {isTablet && (
    //     <div className={styles.buttons}>
    //       <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={id} />
    //     </div>
    //   )}
    //   {/* {isPhone && ( */}
    //   {/*  <TableMenuControl */}
    //   {/*    activeControl={activeControl} */}
    //   {/*    setActiveControl={setActiveControl} */}
    //   {/*    isActiveModal={isActiveModal} */}
    //   {/*  > */}
    //   {/*    <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={id} /> */}
    //   {/*  </TableMenuControl> */}
    //   {/* )} */}
    // </div>
  );
};

export default MobileElementAdministrators;

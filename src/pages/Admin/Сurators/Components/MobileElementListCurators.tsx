import React from 'react';
import { IGetCuratorData } from '../../../../hooks/useCurators';
import MobileElementCurator from './MobileElementCurator';

interface IMobileElementListCurators{
  data: IGetCuratorData[] | undefined;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}
const MobileElementListCurators = ({ data, isActiveModal, setIsActiveModal }:IMobileElementListCurators) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {data?.map((curator) => (
      <MobileElementCurator
        key={curator.id}
        id={curator.id}
        lastName={curator.lastName}
        firstName={curator.firstName}
        patronymic={curator.patronymic}
        email={curator.email}
        groups={curator.groups}
        isActiveModal={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />
    ))}
  </>
);

export default MobileElementListCurators;

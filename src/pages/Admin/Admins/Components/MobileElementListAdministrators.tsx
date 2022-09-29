import React from 'react';
import { IGetUserData } from '../../../../hooks/useUser';
import MobileElementAdministrators from './MobileElementAdministrators';

interface IMobileElementListAdministators{
  data: IGetUserData[] | undefined;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}
const MobileElementListAdministrators = ({ data, isActiveModal, setIsActiveModal }:IMobileElementListAdministators) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {data?.map((item:IGetUserData) => (
      <MobileElementAdministrators
        key={item.id}
        id={item.id}
        lastName={item.lastName}
        firstName={item.firstName}
        patronymic={item.patronymic}
        email={item.email}
        isActiveModal={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />
    ))}
  </>
);

export default MobileElementListAdministrators;

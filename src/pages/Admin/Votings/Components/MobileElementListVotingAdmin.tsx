import React from 'react';
import MobileElementVotingAdmin from './MobileElementVotingAdmin';
import { IGetVotingAdminData } from '../../../../hooks/useVotingAdmin';

interface IMobileElementListVotingAdmin{
  data: IGetVotingAdminData[] | undefined;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}
const MobileElementListVotingAdmin = ({ data, isActiveModal, setIsActiveModal }:IMobileElementListVotingAdmin) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {data?.map((item:IGetVotingAdminData) => (
      <MobileElementVotingAdmin
        key={item.id}
        obj={item}
        isActiveModal={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />
    ))}
  </>
);

export default MobileElementListVotingAdmin;

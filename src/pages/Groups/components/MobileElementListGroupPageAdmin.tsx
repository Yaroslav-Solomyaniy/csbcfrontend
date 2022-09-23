import React from 'react';
import MobileElementGroupPageAdmin from './MobileElementGroupPageAdmin';
import { IGroupData } from '../../../hooks/useGroups';

interface IMobileElementListGroupPageAdmin{
  data: IGroupData[] | undefined;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}
const MobileElementListGroupPageAdmin = ({ data,
  isActiveModal,
  setIsActiveModal,
}:IMobileElementListGroupPageAdmin):JSX.Element => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {data?.map((item:IGroupData) => (
      <MobileElementGroupPageAdmin
        key={item.id}
        id={item.id}
        groupName={item.name}
        firstName={item.curator.firstName}
        lastName={item.curator.lastName}
        patronymic={item.curator.patronymic}
        students={item.students}
        orderNumber={item.orderNumber}
        isActiveModal={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />
    ))}
  </>
);

export default MobileElementListGroupPageAdmin;

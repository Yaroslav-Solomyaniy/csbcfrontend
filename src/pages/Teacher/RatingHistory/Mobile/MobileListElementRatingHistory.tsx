import React from 'react';
import MobileElementRatingHistory from './MobileElementRatingHistory';
import { ITableRowItem } from '../../../../components/common/table/TableBody';

interface IMobileListElementRatingHistory{
  dataRow: any;
}

const MobileListElementRatingHistory = ({ dataRow }: IMobileListElementRatingHistory):JSX.Element => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {dataRow?.map((item:any) => (
      <MobileElementRatingHistory
        key={item.id}
        id={item.id}
        date={item.createdAt}
        grade={item.grade}
        reasonOfChange={item.createdAt}
        lastName={item.userChanged.lastName}
        firstName={item.userChanged.firstName}
        patronymic={item.userChanged.patronymic}
      />
    ))}
  </>
);

export default MobileListElementRatingHistory;

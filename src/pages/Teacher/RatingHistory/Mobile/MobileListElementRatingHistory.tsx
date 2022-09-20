import React from 'react';
import moment from 'moment';
import MobileElementRatingHistory from './MobileElementRatingHistory';
import { ITableRowItem } from '../../../../components/common/table/TableBody';
import { IGetGradesData } from '../../../../hooks/useEstimates';
import { IGradesHistories } from '../../../../hooks/useGradesHistory';
import styles from '../index.module.scss';

interface IMobileListElementRatingHistory{
data: IGradesHistories[] | undefined;
}

const MobileListElementRatingHistory = ({ data }: IMobileListElementRatingHistory):JSX.Element => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    <div className={styles.content}>
      {data?.map((item:IGradesHistories) => (
        <MobileElementRatingHistory
          key={item.id}
          id={item.id}
          date={moment(item.createdAt).format('DD.MM.yyyy')}
          grade={item.grade}
          reasonOfChange={item.reasonOfChange}
          lastName={item.userChanged.lastName}
          firstName={item.userChanged.firstName}
          patronymic={item.userChanged.patronymic}
        />
      ))}
    </div>
  </>
);

export default MobileListElementRatingHistory;

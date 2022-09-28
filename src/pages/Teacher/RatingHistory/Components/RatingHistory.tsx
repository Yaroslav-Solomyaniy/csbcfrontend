import React from 'react';
import { typeInfoStudent } from '../index';
import { ITableHeader } from '../../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../../components/common/table/TableBody';
import styles from '../index.module.scss';
import pagesStyles from '../../../pagesStyle.module.scss';
import Table from '../../../../components/common/table';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { useDeviceContext } from '../../../../context/TypeDevice';
import MobileListElementRatingHistory from '../Mobile/MobileListElementRatingHistory';
import { IGradesHistories } from '../../../../hooks/useGradesHistory';

interface IRatingHistory{
  infoRow: typeInfoStudent;
  dataHeader: ITableHeader[];
  dataRow: ITableRowItem[];
  closeModal: ()=>void;
  modalTitle?: string;
  data?: IGradesHistories[];
}

const RatingHistory = ({ infoRow, dataHeader, dataRow, closeModal, modalTitle, data }:IRatingHistory) => {
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  return (
    <>
      {modalTitle && (<div className={pagesStyles.modal__title}>{modalTitle}</div>)}
      <div className={styles.infoBlock}>
        <div className={styles.subtitle}>
          {`${infoRow.lastName} ${infoRow.firstName} ${infoRow.patronymic}, ${infoRow.groupName}`}
        </div>
        <div className={styles.subtitle}>
          {`Предмет: ${infoRow.courseName}`}
        </div>
        {(isDesktop || isTablet) && (
        <Table
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          isHistoryTable
        />
        )}
        {isPhone && (
        <MobileListElementRatingHistory data={data} />
        )}

      </div>
      <ModalControlButtons
        handleClose={closeModal}
        cancelButtonText="Закрити"
      />
    </>
  );
};

RatingHistory.defaultProps = {
  modalTitle: '',
  data: undefined,
};

export default RatingHistory;

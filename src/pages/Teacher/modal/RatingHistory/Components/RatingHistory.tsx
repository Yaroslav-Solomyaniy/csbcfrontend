import React from 'react';
import { typeInfoStudent } from '../index';
import { ITableHeader } from '../../../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import styles from '../index.module.scss';
import pagesStyles from '../../../../pagesStyle.module.scss';
import Table from '../../../../../components/common/Table';
import ModalControlButtons from '../../../../../components/common/ModalControlButtons';

interface IRatingHistory{
  infoRow: typeInfoStudent;
  dataHeader: ITableHeader[];
  dataRow: ITableRowItem[];
  closeModal: ()=>void;
  modalTitle?: string;
}

const RatingHistory = ({ infoRow, dataHeader, dataRow, closeModal, modalTitle }:IRatingHistory) => (
  <>
    {modalTitle && (<div className={pagesStyles.modal__title}>{modalTitle}</div>)}
    <div className={styles.infoBlock}>
      <div className={styles.subtitle}>
        {`${infoRow.lastName} ${infoRow.firstName} ${infoRow.patronymic}, ${infoRow.groupName}`}
      </div>
      <div className={styles.subtitle}>
        {`Предмет: ${infoRow.courseName}`}
      </div>
      <Table
        dataHeader={dataHeader}
        dataRow={dataRow}
        gridColumns={styles.columns}
        isHistoryTable
      />
    </div>
    <ModalControlButtons
      handleClose={closeModal}
      cancelButtonText="Закрити"
    />
  </>
);

RatingHistory.defaultProps = {
  modalTitle: '',
  data: undefined,
};

export default RatingHistory;

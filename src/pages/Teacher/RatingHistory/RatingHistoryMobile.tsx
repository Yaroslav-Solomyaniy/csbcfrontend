import React from 'react';
import { typeInfoStudent } from './index';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
import styles from './index.module.scss';
import pagesStyles from '../../pagesStyle.module.scss';
import Table from '../../../components/common/table';
import ModalControlButtons from '../../../components/common/ModalControlButtons';

interface IRatingHistoryNotebook{
infoRow: typeInfoStudent;
  dataHeader: ITableHeader[];
  dataRow: ITableRowItem[];
  closeModal: ()=>void;
  modalTitle?: string;
}

const RatingHistoryInfo = ({ infoRow, dataHeader, dataRow, closeModal, modalTitle }:IRatingHistoryNotebook) => (
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
        isTableResult
      />
    </div>
    <ModalControlButtons
      handleClose={closeModal}
      cancelButtonText="Назад"
    />
  </>
);

RatingHistoryInfo.defaultProps = {
  modalTitle: '',
};

export default RatingHistoryInfo;

import React from 'react';
import TableFilter from '../../../components/common/table/TableFilter';
import PageFilter from './PageFilter';
import styles from '../index.module.scss';
import ItemButtons from './ItemButtons';
import { IIsActiveModalState, IParams } from '../index';
import { IGetPageTeacherData } from '../../../hooks/usePageTeacher';

interface INoteBookTable{
  formData: IGetPageTeacherData[];
  isActiveModal: IIsActiveModalState;
  setIsActiveModal: (value:IIsActiveModalState) => void;
}
const AdaptiveTable = ({ formData, isActiveModal, setIsActiveModal }:INoteBookTable) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {formData?.map((item) => (
      <div key={item.id} className={styles.notebookItem}>
        <div className={styles.notebookItem_Content}>
          <h1 className={styles.notebookItem_Content__Title}>
            {/* eslint-disable-next-line max-len */}
            {`${item.student.user.lastName} ${item.student.user.firstName} ${item.student.user.patronymic}, ${item.student.group.name}`}
          </h1>
          <h6 className={styles.notebookItem_Content__subTitle}>{`Предмет: ${item.course.name}`}</h6>
          <h6 className={styles.notebookItem_Content__subTitle}>{`Оцінка: ${item.grade}`}</h6>
        </div>
        <div className={styles.notebookItem_buttons}>
          <ItemButtons isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />
        </div>
      </div>
    ))}
  </>
);

export default AdaptiveTable;

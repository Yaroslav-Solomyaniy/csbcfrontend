import React, { useState } from 'react';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../types';
import styles from './index.module.scss';
import Button from '../../../components/common/Button';
import Table from '../../../components/common/table';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
// eslint-disable-next-line import/order
import clsx from 'clsx';

const dataHeaderCourses: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Викладач' },
  { id: 3, label: 'К-ть голосів' },
];

export interface IVoting {
  groups: number [];
  firstDate: Date | null;
  lastDate: Date | null;
  requiredCourse: { id: number; courseId: string; semester: number; }[];
  notRequiredCourse: { id: number; courseId: string; semester: number; }[];
}

export const initialState = [
  { id: new Date().getTime(), courseId: '', semester: 1 },
];

const formInitialData: IVoting/*: IUserCreateParams */ = {
  groups: [],
  firstDate: null,
  lastDate: null,
  requiredCourse: initialState,
  notRequiredCourse: initialState,
};

export const VotingResultModal = ({ modalActive, closeModal }: IEditModal): JSX.Element => {
  const [formData, setFormData] = useState(formInitialData);
  const [activeBlock, setActiveBlock] = useState('course');
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const handleClose = () => {
    setFormData(formInitialData);
    closeModal();
  };

  const ActiveStudentsBlock = () => {
    setActiveBlock('students');
  };

  const ActiveCourseBlock = () => {
    setActiveBlock('course');
  };

  return (
    <ModalWindow modalTitle="Результати голосування для " active={modalActive} closeModal={handleClose}>
      <h4 className={styles.statusVoting}>Нове</h4>
      <div className={styles.blockControlButtons}>
        <Button
          className={clsx(styles.controlButton, activeBlock === 'course' && styles.isActiveButton)}
          onClick={ActiveCourseBlock}
        >
          Предмети
        </Button>
        <Button
          className={clsx(styles.controlButton, activeBlock === 'students' && styles.isActiveButton)}
          onClick={ActiveStudentsBlock}
        >
          Студенти
        </Button>
      </div>
      {activeBlock === 'course'
        && (
          <div className={styles.BlockCourses}>
            <h1 className={styles.BlockCoursesTitle}>Семестр I</h1>
            <Table
              dataHeader={dataHeaderCourses}
              dataRow={dataRow}
              gridColumns={styles.columns}
            />
            <h1 className={styles.BlockCoursesTitle}>Семестр II</h1>
            <Table
              dataHeader={dataHeaderCourses}
              dataRow={dataRow}
              gridColumns={styles.columns}
            />
          </div>
        )}
      {activeBlock === 'students'
        && <div className={styles.BlockStudents}>studik</div>}
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={(e) => e}
        isOffSubmit
        cancelButtonText="Назад"
      />
    </ModalWindow>
  );
};

export default VotingResultModal;

import React, { useState } from 'react';
import styles from './index.module.scss';
import Table from '../../../components/common/table';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { IGetVotingResultDataById } from '../../../hooks/useVotingAdmin';

const dataHeaderCourses: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Викладач' },
  { id: 3, label: 'К-ть голосів' },
];

interface IResultCourses{
formData:IGetVotingResultDataById;
}

const ResultCourses = ({ formData }:IResultCourses):JSX.Element => (
  <div className={styles.BlockCourses}>
    <h1 className={styles.Title}>Семестр I</h1>
    <Table
      isTableResult
      dataHeader={dataHeaderCourses}
      dataRow={formData.courses.filter((item) => item.semester === 1).map((item) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2,
            label: `${item.teacher.lastName}
                         ${item.teacher.firstName}
                         ${item.teacher.patronymic}` },
          { id: 3, label: item.allVotes },
        ],
        key: item.id,
      }))}
      gridColumns={styles.columns}
    />
    <h1 className={styles.Title}>Семестр II</h1>
    <Table
      isTableResult
      dataHeader={dataHeaderCourses}
      dataRow={formData.courses.filter((item) => item.semester === 2).map((item) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2,
            label: `${item.teacher.lastName}
                        ${item.teacher.firstName}
                        ${item.teacher.patronymic}` },
          { id: 3, label: item.allVotes },
        ],
        key: item.id,
      }))}
      gridColumns={styles.columns}
    />
  </div>
);

export default ResultCourses;

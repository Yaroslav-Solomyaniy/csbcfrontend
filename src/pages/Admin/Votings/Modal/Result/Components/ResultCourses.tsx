import React from 'react';
import styles from '../index.module.scss';
import Table from '../../../../../../components/common/Table';
import { ITableHeader } from '../../../../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { IGetVotingResultDataById } from '../../../../../../hooks/api/admin/voting/useGetResult/IGetVotingResultDataById';

const dataHeaderCourses: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Викладач' },
  { id: 3, label: 'Вид проведення' },
  { id: 4, label: 'К-ть голосів' },
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
      dataRow={formData.courses.filter((item) => item.semester % 2 === 1).map((item) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2,
            label: `${item.teacher.lastName}
                         ${item.teacher.firstName}
                         ${item.teacher.patronymic}` },
          { id: 3, label: item.type },
          { id: 4, label: item.allVotes },
        ],
        key: item.id,
      }))}
      gridColumns={styles.columns}
    />
    <h1 className={styles.Title}>Семестр II</h1>
    <Table
      isTableResult
      dataHeader={dataHeaderCourses}
      dataRow={formData.courses.filter((item) => item.semester % 2 === 0).map((item) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2,
            label: `${item.teacher.lastName}
                        ${item.teacher.firstName}
                        ${item.teacher.patronymic}` },
          { id: 3, label: item.type },
          { id: 4, label: item.allVotes },
        ],
        key: item.id,
      }))}
      gridColumns={styles.columns}
    />
  </div>
);

export default ResultCourses;

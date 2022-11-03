import React from 'react';
import styles from '../index.module.scss';
import Table from '../../../../../../components/common/Table';
import { IsCheck } from '../../../../../../components/common/Icons';
import { IGetVotingResultDataById } from '../../../../../../hooks/PagesInAdmin/useVotings';
import { ITableHeader } from '../../../../../../components/common/Table/TypeDisplay/Desktop/TableHeader';

const dataHeaderStudents: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Статус' },
];

interface IResultStudents{
  formData:IGetVotingResultDataById;
}

const ResultStudents = ({ formData }:IResultStudents):JSX.Element => (
  <div className={styles.BlockStudents}>
    {formData.groups.map((item) => (
      <div key={item.id}>
        <h1 className={styles.Title}>{`Група ${item.name}`}</h1>
        <Table
          isTableResult
          dataHeader={dataHeaderStudents}
          dataRow={formData.students.filter((student) => student.group.name === item.name).map((stud) => ({
            list: [
              { id: 1, label: `${stud.user.lastName} ${stud.user.firstName} ${stud.user.patronymic}` },
              { id: 2, label: stud.isVoted ? <IsCheck /> : '' },
            ],
            key: item.id,
          }))}
          gridColumns={styles.columnsStudents}
        />
      </div>
    ))}
  </div>
);

export default ResultStudents;

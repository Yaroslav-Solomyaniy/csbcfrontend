import React from 'react';
import { IGetVotingSubmitDataById } from '../../../../../hooks/PagesInAdmin/useVotings';
import styles from '../../../../pagesStyle.module.scss';
import columns from './submitForm.module.scss';
import Table from '../../../../../components/common/Table';
import Button from '../../../../../components/common/Button';
import { ITableHeader } from '../../../../../components/common/Table/TypeDisplay/Desktop/TableHeader';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Дія' },
  { id: 2, label: 'Назва дисципліни' },
  { id: 3, label: 'Викладач' },
  { id: 4, label: 'К-ть голосів' },

];

interface ISubmitVotingForm{
data: IGetVotingSubmitDataById | undefined;
formData: number[];
onSubmit: (e:React.FormEvent | undefined) => void;
handleRadioClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SubmitVotingForm = ({ data, formData, onSubmit, handleRadioClick }:ISubmitVotingForm) => (
  <>
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title}>Фахова компетентність - I семестр</h1>
      <Table
        dataHeader={dataHeader}
        isTableResult
        dataRow={data?.requiredCourses.filter((item) => item.semester === 1).map((course) => ({ list: [
          { id: 1,
            label: <input
              type="radio"
              name="0"
              checked={course.id === formData[0]}
              value={course.id}
              onChange={handleRadioClick}
            /> },
          { id: 2, label: course.name },
          { id: 3,
            label: `${course.teacher.lastName}
          ${course.teacher.firstName[0]}.
          ${course.teacher.patronymic[0]}.` },
          { id: 4, label: course.allVotes },
        ],
        key: course.id })) || []}
        gridColumns={columns.columns}
      />
      <h1 className={styles.title}>Загальна компетентність - I семестр</h1>
      <Table
        isTableResult
        dataHeader={dataHeader}
        dataRow={data?.notRequiredCourses.filter((item) => item.semester === 1).map((course) => ({ list: [
          { id: 1,
            label: <input
              type="radio"
              name="1"
              checked={course.id === formData[1]}
              value={course.id}
              onChange={handleRadioClick}
            /> },
          { id: 2, label: course.name },
          { id: 3,
            label: `${course.teacher.lastName}
          ${course.teacher.firstName[0]}.
          ${course.teacher.patronymic[0]}.` },
          { id: 4, label: course.allVotes },
        ],
        key: course.id })) || []}
        gridColumns={columns.columns}
      />
      <h1 className={styles.title}>Фахова компетентність - II семестр</h1>
      <Table
        isTableResult
        dataHeader={dataHeader}
        dataRow={data?.requiredCourses.filter((item) => item.semester === 2).map((course) => ({ list: [
          { id: 1,
            label: <input
              type="radio"
              name="2"
              checked={course.id === formData[2]}
              value={course.id}
              onChange={handleRadioClick}
            /> },
          { id: 2, label: course.name },
          { id: 3,
            label: `${course.teacher.lastName}
          ${course.teacher.firstName[0]}.
          ${course.teacher.patronymic[0]}.` },
          { id: 4, label: course.allVotes },
        ],
        key: course.id })) || []}
        gridColumns={columns.columns}
      />
      <h1 className={styles.title}>Загальна компетентність - II семестр</h1>
      <Table
        isTableResult
        dataHeader={dataHeader}
        dataRow={data?.notRequiredCourses.filter((item) => item.semester === 2).map((course) => ({ list: [
          { id: 1,
            label: <input
              type="radio"
              name="3"
              checked={course.id === formData[3]}
              value={course.id}
              onChange={handleRadioClick}
            /> },
          { id: 2, label: course.name },
          { id: 3,
            label: `${course.teacher.lastName}
          ${course.teacher.firstName[0]}.
          ${course.teacher.patronymic[0]}.` },
          { id: 4, label: course.allVotes },
        ],
        key: course.id })) || []}
        gridColumns={columns.columns}
      />
    </form>
    <div className={styles.voting_footer}>
      <Button
        onClick={() => console.log(formData)}
        size="large"
        nameClass="primary"
        className={styles.button}
        disabled={formData.includes(0)}
      >
        Затвердити компетентності
      </Button>
    </div>
  </>
);

export default SubmitVotingForm;

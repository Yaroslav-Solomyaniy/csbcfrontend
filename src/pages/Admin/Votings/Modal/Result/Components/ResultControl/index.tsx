import React from 'react';
import styles from './index.module.scss';
import Button from '../../../../../../../components/common/Button';

interface IResultControl{
  id: number;
  status: string;
  activeBlock: boolean;
  ActiveCourseBlock: () => void;
  ActiveStudentsBlock: () => void;
  changeWindow: (value: number) => void;
}

const ResultControl = ({ id,
  changeWindow,
  status,
  ActiveCourseBlock,
  ActiveStudentsBlock,
  activeBlock }:IResultControl) => (
    <>
      <h4 className={styles.statusVoting}>
        {status}
        {status === 'Потребує перегляду'
        && (
          <Button
            onClick={() => changeWindow(id)}
            size="small"
            nameClass="primary"
            className={styles.revoteButton}
          >
            Створити переголосування
          </Button>
        )}
      </h4>

      <div className={styles.blockControlButtons}>
        <Button
          size="large"
          nameClass={!activeBlock ? 'primary' : 'secondary'}
          className={styles.leftButton}
          onClick={ActiveCourseBlock}
        >
          Предмети
        </Button>
        <Button
          size="large"
          className={styles.rightButton}
          nameClass={activeBlock ? 'primary' : 'secondary'}
          onClick={ActiveStudentsBlock}
        >
          Студенти
        </Button>
      </div>
    </>
);

export default ResultControl;

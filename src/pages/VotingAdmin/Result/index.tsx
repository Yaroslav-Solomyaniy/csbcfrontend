import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
// import uk from 'date-fns/locale/uk';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
// import { IEditModal } from '../../../types';
import styles from './index.module.scss';
import Button from '../../../components/common/Button';
import Table from '../../../components/common/table';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
// import { IUserEditParams } from '../../../hooks/useUser';
import { IGetVotingResultDataById } from '../../../hooks/useVotingAdmin';
import { useVotingAdminContext } from '../../../context/voting';
// import pagesStyle from '../../pagesStyle.module.scss';
// import { Delete, Edit, Review } from '../../../components/common/Icon';

const dataHeaderCourses: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Викладач' },
  { id: 3, label: 'К-ть голосів' },
];

const formInitialData: IGetVotingResultDataById = {
  id: 0,
  tookPart: 0,
  status: '',
  groups: [],
  startDate: '',
  courses: [],
};

interface IResultModal {
  modalActive: boolean;
  closeModal: () => void;
  votingId: number;
}

export const VotingResultModal = ({ modalActive, closeModal, votingId }: IResultModal): JSX.Element => {
  const [formData, setFormData] = useState(formInitialData);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [dataRowSemesterOne, setdataRowSemesterOne] = useState<ITableRowItem[]>([]);
  const [dataRowSemesterTwo, setdataRowSemesterTwo] = useState<ITableRowItem[]>([]);
  const { votingResult } = useVotingAdminContext();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };

  useEffect(() => {
    if (votingId) {
      votingResult?.votingGetResultById({ id: `${votingId}` });
    }
  }, [votingId]);

  const coursesInfo = () => {
    setdataRowSemesterOne(formData.courses.filter((item) => item.semester === 1).map((item) => ({
      list: [
        { id: 1, label: item.name },
        { id: 2, label: `${item.teacher.lastName} ${item.teacher.firstName} ${item.teacher.patronymic}` },
        { id: 3, label: item.id },
      ],
      key: item.id,
    })));
    setdataRowSemesterTwo(formData.courses.filter((item) => item.semester === 2).map((item) => ({
      list: [
        { id: 1, label: item.name },
        { id: 2, label: `${item.teacher.lastName} ${item.teacher.firstName} ${item.teacher.patronymic}` },
        { id: 3, label: item.id },
      ],
      key: item.id,
    })));
  };

  useEffect(() => {
    coursesInfo();
  }, [formData]);

  useEffect(() => {
    if (activeBlock === 'course') {
      coursesInfo();
    } else if (activeBlock === 'students') {
      console.log('Students modal window');
    } else {
      console.log('Error modal');
    }
  }, [activeBlock]);

  useEffect(() => {
    if (votingResult?.data) {
      setFormData({
        id: votingResult?.data.id,
        tookPart: votingResult?.data.tookPart,
        status: votingResult?.data.status,
        groups: votingResult?.data.groups,
        startDate: votingResult.data.startDate,
        courses: votingResult.data.courses,
      });
      setActiveBlock('course');
    }
  }, [votingResult?.data]);

  const ActiveStudentsBlock = () => {
    setActiveBlock('students');
    console.log(formData);
  };
  const ActiveCourseBlock = () => {
    setActiveBlock('course');
    console.log(formData);
  };

  return (
    <ModalWindow
      modalTitle={`Результати голосування для
      ${formData.groups.map((item) => item.name).join(',')}
      від ${moment(formData.startDate).format('DD.MM.YYYY')}`}
      active={modalActive}
      closeModal={handleClose}
    >
      <h4 className={styles.statusVoting}>{formData.status}</h4>
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
              dataRow={dataRowSemesterOne}
              gridColumns={styles.columns}
            />
            <h1 className={styles.BlockCoursesTitle}>Семестр II</h1>
            <Table
              dataHeader={dataHeaderCourses}
              dataRow={dataRowSemesterTwo}
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

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import uk from 'date-fns/locale/uk';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { IEditModal } from '../../../types';
import styles from './index.module.scss';
import Button from '../../../components/common/Button';
import Table from '../../../components/common/table';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';
import { IUserEditParams } from '../../../hooks/useUser';
import { IGetVotingAdminData, IGetVotingResultDataById } from '../../../hooks/useVotingAdmin';
import { useVotingAdminContext } from '../../../context/voting';
import pagesStyle from '../../pagesStyle.module.scss';
import { Delete, Edit, IsCheck, Review } from '../../../components/common/Icon';

const dataHeaderCourses: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Викладач' },
  { id: 3, label: 'К-ть голосів' },
];
const dataHeaderStudents: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Статус' },
];

const formInitialData: IGetVotingResultDataById = {
  id: 0,
  tookPart: 0,
  status: '',
  groups: [],
  students: [],
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
  const [activeBlock, setActiveBlock] = useState<boolean>(false);
  const [dataRowSemesterOne, setdataRowSemesterOne] = useState<ITableRowItem[]>([]);
  const [dataRowSemesterTwo, setdataRowSemesterTwo] = useState<ITableRowItem[]>([]);
  const { votingResult } = useVotingAdminContext();

  useEffect(() => {
    if (votingId) {
      votingResult?.votingGetResultById({ id: `${votingId}` });
    }
  }, [votingId]);
  useEffect(() => {
    if (votingResult?.data) {
      setFormData({
        id: votingResult?.data.id,
        tookPart: votingResult?.data.tookPart,
        status: votingResult?.data.status,
        students: votingResult?.data.students,
        groups: votingResult?.data.groups,
        startDate: votingResult.data.startDate,
        courses: votingResult.data.courses,
      });
    }
  }, [votingResult?.data]);

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setFormData(formInitialData);
    }, 200);
  };
  const ActiveStudentsBlock = () => {
    setActiveBlock(true);
  };
  const ActiveCourseBlock = () => {
    setActiveBlock(false);
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
          className={clsx(styles.controlButton, !activeBlock && styles.isActiveButton)}
          onClick={ActiveCourseBlock}
        >
          Предмети
        </Button>
        <Button
          className={clsx(styles.controlButton, activeBlock && styles.isActiveButton)}
          onClick={ActiveStudentsBlock}
        >
          Студенти
        </Button>
      </div>
      {!activeBlock
        && (
          <div className={styles.BlockCourses}>
            <h1 className={styles.Title}>Семестр I</h1>
            <Table
              isTableResult
              dataHeader={dataHeaderCourses}
              dataRow={formData.courses.filter((item) => item.semester === 1).map((item) => ({
                list: [
                  { id: 1, label: item.name },
                  { id: 2, label: `${item.teacher.lastName} ${item.teacher.firstName} ${item.teacher.patronymic}` },
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
                  { id: 2, label: `${item.teacher.lastName} ${item.teacher.firstName} ${item.teacher.patronymic}` },
                  { id: 3, label: item.allVotes },
                ],
                key: item.id,
              }))}
              gridColumns={styles.columns}
            />
          </div>
        )}
      {activeBlock
        && (
        <div className={styles.BlockStudents}>
          {formData.groups.map((item) => (
            <>
              <h1 className={styles.Title}>
                Група
                {' '}
                {item.name}
              </h1>
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
            </>
          ))}
        </div>
        )}
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

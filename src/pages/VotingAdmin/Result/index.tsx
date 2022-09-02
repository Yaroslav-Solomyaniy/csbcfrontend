import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import styles from './index.module.scss';
import Button from '../../../components/common/Button';
import { IGetVotingResultDataById } from '../../../hooks/useVotingAdmin';
import { useVotingAdminContext } from '../../../context/voting';
import ResultCourses from './ResultCourses';
import ResultStudents from './ResultStudents';

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
      {!activeBlock && <ResultCourses formData={formData} />}
      {activeBlock && <ResultStudents formData={formData} />}
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

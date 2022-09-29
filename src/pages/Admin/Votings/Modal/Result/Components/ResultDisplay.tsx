import React, { useState } from 'react';
import ResultControl from './ResultControl';
import ResultCourses from './ResultCourses';
import ResultStudents from './ResultStudents';
import ModalControlButtons from '../../../../../../components/common/ModalControlButtons';
import { IGetVotingResultDataById } from '../../../../../../hooks/useVotingAdmin';

interface IResultDisplay{
  votingId: number;
  formData: IGetVotingResultDataById;
  changeWindow: (value: number) => void;
  handleClose: ()=> void;
}

const ResultDisplay = ({ votingId, formData, changeWindow, handleClose }:IResultDisplay) => {
  const [activeBlock, setActiveBlock] = useState<boolean>(false);
  const ActiveCourseBlock = () => {
    setActiveBlock(false);
  };

  const ActiveStudentsBlock = () => {
    setActiveBlock(true);
  };

  return (
    <>
      <ResultControl
        id={votingId}
        status={formData.status}
        activeBlock={activeBlock}
        ActiveCourseBlock={ActiveCourseBlock}
        ActiveStudentsBlock={ActiveStudentsBlock}
        changeWindow={changeWindow}
      />
      {!activeBlock && <ResultCourses formData={formData} />}
      {activeBlock && <ResultStudents formData={formData} />}
      <ModalControlButtons
        handleClose={handleClose}
        cancelButtonText="Назад"
      />
    </>
  );
};

export default ResultDisplay;

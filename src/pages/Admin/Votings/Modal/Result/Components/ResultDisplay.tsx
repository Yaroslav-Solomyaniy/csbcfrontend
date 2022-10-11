import React, { useState } from 'react';
import ResultControl from './ResultControl';
import ResultCourses from './ResultCourses';
import ResultStudents from './ResultStudents';
import { IGetVotingResultDataById } from '../../../../../../hooks/PagesInAdmin/useVotings';

interface IResultDisplay{
  votingId: number;
  formData: IGetVotingResultDataById;
}

const ResultDisplay = ({ votingId, formData }:IResultDisplay) => {
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
      />
      {!activeBlock && <ResultCourses formData={formData} />}
      {activeBlock && <ResultStudents formData={formData} />}
    </>
  );
};

export default ResultDisplay;

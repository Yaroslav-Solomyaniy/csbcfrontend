import React from 'react';
import { IGetPageTeacherData } from '../../../hooks/usePageTeacher';
import MobileElementTeacherPage from './MobileElementTeacherPage';

interface IMobileElementListTeacherPage{
  formData: IGetPageTeacherData[] | undefined;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}
const MobileElementListTeacherPage = ({ formData,
  isActiveModal,
  setIsActiveModal,
}:IMobileElementListTeacherPage):JSX.Element => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {formData?.map((item: IGetPageTeacherData) => (
      <MobileElementTeacherPage
        key={item.id}
        id={item.id}
        lastName={item.student.user.lastName}
        firstName={item.student.user.firstName}
        patronymic={item.student.user.patronymic}
        groupName={item.student.group.name}
        courseName={item.course.name}
        grade={item.grade}
        isActiveModal={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />
    ))}
  </>
);

export default MobileElementListTeacherPage;

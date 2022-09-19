import React, { useState } from 'react';
import { IIsActiveModalState, IParams } from '../index';
import { IGetPageTeacherData } from '../../../hooks/usePageTeacher';
import AdaptiveElementInTeacherPage from './AdaptiveElementInTeacherPage';

interface IListElementInTeacherPage{
  formData: IGetPageTeacherData[] | undefined;
  isActiveModal: IIsActiveModalState;
  setIsActiveModal: (value:IIsActiveModalState) => void;
}
const ListElementInTeacherPage = ({ formData,
  isActiveModal,
  setIsActiveModal,
}:IListElementInTeacherPage):JSX.Element => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {formData?.map((item: IGetPageTeacherData) => (
      <AdaptiveElementInTeacherPage
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

export default ListElementInTeacherPage;

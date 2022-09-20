import React from 'react';
import { IIsActiveModalState } from '../index';
import { IGetPageTeacherData } from '../../../hooks/usePageTeacher';
import DisplayElementInTeacher from './DisplayElementInTeacher';

interface IListElementInTeacher{
  formData: IGetPageTeacherData[] | undefined;
  isActiveModal: IIsActiveModalState;
  setIsActiveModal: (value:IIsActiveModalState) => void;
}
const ListElementInTeacher = ({ formData,
  isActiveModal,
  setIsActiveModal,
}:IListElementInTeacher):JSX.Element => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {formData?.map((item: IGetPageTeacherData) => (
      <DisplayElementInTeacher
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

export default ListElementInTeacher;

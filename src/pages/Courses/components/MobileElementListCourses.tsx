import React from 'react';
import { IGetCoursesData } from '../../../hooks/useCourses';
import MobileElementCourse from './MobileElementCourse';

interface IMobileElementListCourses{
  data: IGetCoursesData[] | undefined;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}

const MobileElementListCourses = ({ data, isActiveModal, setIsActiveModal }:IMobileElementListCourses) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {data?.map((course:IGetCoursesData) => (
      <MobileElementCourse
        obj={course}
        key={course.id}
        isActiveModal={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />
    ))}
  </>
);

export default MobileElementListCourses;

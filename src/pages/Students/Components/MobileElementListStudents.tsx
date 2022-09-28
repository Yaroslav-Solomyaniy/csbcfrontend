import React from 'react';
import { IStudentData } from '../../../hooks/useStudents';
import MobileElementStudents from './MobileElementStudents';

interface IMobileElementListStudents{
  data: IStudentData[] | undefined;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}
const MobileElementListStudents = ({ data, isActiveModal, setIsActiveModal }:IMobileElementListStudents) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {data?.map((item:IStudentData) => (
      <MobileElementStudents
        key={item.id}
        obj={item}
        isActiveModal={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />
    ))}
  </>
);

export default MobileElementListStudents;

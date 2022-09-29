import React, { useState } from 'react';
import { useDeviceContext } from '../../../context/TypeDevice';
import { EditAndHistory } from '../../../components/common/GroupButtons';
import TableMenuControl from '../../../components/common/AdaptiveTableModalButtons';
import styles from '../../MobileElement.module.scss';

interface IMobileElementTeacherPage{
  id: number;
  lastName: string;
  firstName: string;
  patronymic: string;
  groupName: string;
  courseName: string;
  grade: number;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}
const MobileElementTeacherPage = ({ id,
  courseName,
  groupName,
  lastName,
  firstName,
  grade,
  patronymic, isActiveModal, setIsActiveModal }:IMobileElementTeacherPage):JSX.Element => {
  const { isTablet, isPhone } = useDeviceContext();
  const [activeControl, setActiveControl] = useState<boolean>(false);

  return (
    <h1>pid</h1>
  );
};

export default MobileElementTeacherPage;

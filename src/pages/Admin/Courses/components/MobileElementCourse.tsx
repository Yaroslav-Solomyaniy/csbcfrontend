import React, { useState } from 'react';
import { IGetCoursesData } from '../../../../hooks/useCourses';
import { useDeviceContext } from '../../../../context/TypeDevice';
import PhoneElementBlock from '../../../../components/common/PhoneElementBlock';
import styles from '../../../MobileElement.module.scss';
import { EditAndDelete } from '../../../../components/common/GroupButtons';
import TableMenuControl from '../../../../components/common/TableMenuControl';

interface IMobileElementCourse{
  obj: IGetCoursesData;
  isActiveModal: Record<string, number | boolean>;
  setIsActiveModal: (value: Record<string, number | boolean>) => void;
}

const MobileElementCourse = ({ obj, isActiveModal, setIsActiveModal }:IMobileElementCourse) => {
  const { isTablet, isPhone } = useDeviceContext();
  const [activeControl, setActiveControl] = useState<boolean>(false);

  return (
    <PhoneElementBlock key={obj.id}>
      <div className={styles.content}>
        <h1 className={styles.Tablet__title}>{obj.name}</h1>
        <h6 className={styles.Tablet__subtitle}>
          {`Викладач: 
        ${obj.teacher.lastName} ${obj.teacher.firstName} ${obj.teacher.patronymic}`}
        </h6>
        <h6 className={styles.Tablet__subtitle}>{`Семестр: ${obj.semester === 1 ? 'I' : 'II'}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`Кредити: ${obj.credits}`}</h6>
        <h6 className={styles.Tablet__subtitle}>
          {`Групи:
         ${obj.groups ? obj.groups.map((group) => group.name).join(', ') : 'ВІДСУТНІ'}`}
        </h6>
        <h6 className={styles.Tablet__subtitle}>{`Ауд.Години: ${obj.lectureHours}`}</h6>
        <h6 className={styles.Tablet__subtitle}>{`Вид контролю: ${obj.isExam ? 'Іспит' : 'Залік'}`}</h6>
        <h6 className={styles.Tablet__subtitle}>
          {`Вид проведення:
         ${obj.isCompulsory ? "Обов'язковий" : "Не обов'язковий"}`}
        </h6>
      </div>

      {isTablet && (
        <div className={styles.buttons}>
          <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={obj.id} />
        </div>
      )}
      {isPhone && (
        <TableMenuControl
          activeControl={activeControl}
          setActiveControl={setActiveControl}
          isActiveModal={isActiveModal}
        >
          <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={obj.id} />
        </TableMenuControl>
      )}
    </PhoneElementBlock>
  );
};

export default MobileElementCourse;

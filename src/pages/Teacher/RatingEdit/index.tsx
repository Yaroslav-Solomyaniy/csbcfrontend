import React, { useEffect, useState } from 'react';
import styles from '../../pagesStyle.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import ModalInput from '../../../components/common/ModalInput';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/messagesContext';
import { IEditModal } from '../../../types';
import { OnlyNumbers } from '../../../types/regExp';
import SelectReason from '../../../components/common/Select/SelectReason';
import { useTeacherPageContext } from '../../../context/pageTeacher';

interface typeFormData {
  courseId: number;
  grade: number;
  reasonForChange: string;
}

const formInitialData: typeFormData = {
  courseId: 0,
  grade: 0,
  reasonForChange: 'Екзамен',
};

interface typeInfoRow{
  firstName: string;
  lastName: string;
  userId: number;
  patronymic: string;
  courseName: string;
  groupName: string;
  grade: number;
}
const infoRowInitialization: typeInfoRow = {
  firstName: '',
  userId: 0,
  lastName: '',
  patronymic: '',
  courseName: '',
  groupName: '',
  grade: 0,
};

export const TeacherRatingEdit = ({ modalActive, closeModal, studentId }: IEditModal): JSX.Element => {
  const { teacherDataGetById, teacherEditRating } = useTeacherPageContext();

  const [formData, setFormData] = useState<typeFormData>(formInitialData);
  const [isSubmitted, setIsSubmited] = useState(false);
  const [infoRow, setInfoRow] = useState<typeInfoRow>(infoRowInitialization);

  const { addInfo } = useMessagesContext();
  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
    if (formData.courseId && formData.grade && formData.reasonForChange) {
      teacherEditRating?.teacherPageEditRating(formData, infoRow.userId);
    }
  };

  useEffect(() => {
    handleClose();
    if (teacherEditRating?.data) {
      addInfo('Оцінку успішно змінено');
    }
  }, [teacherEditRating?.data]);

  useEffect(() => {
    setInfoRow({ firstName: teacherDataGetById?.data?.student.user.firstName || '',
      patronymic: teacherDataGetById?.data?.student.user.patronymic || '',
      lastName: teacherDataGetById?.data?.student.user.lastName || '',
      courseName: teacherDataGetById?.data?.course.name || '',
      groupName: teacherDataGetById?.data?.student.group.name || '',
      grade: teacherDataGetById?.data?.grade || 0,
      userId: teacherDataGetById?.data?.student.id || 0,
    });
    setFormData({ ...formData, courseId: teacherDataGetById?.data?.course.id || 0 });
  }, [
    teacherDataGetById?.data,
  ]);

  useEffect(() => {
    if (studentId) {
      teacherDataGetById?.pageTeacherGetById(studentId);
    }
  }, [studentId]);

  return (
    <ModalWindow modalTitle="Редагування оцінки" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.subtitle}>
          {infoRow.lastName}
          {' '}
          {infoRow.firstName}
          {' '}
          {infoRow.patronymic}
          ,
          {' '}
          {infoRow.groupName}
        </div>
        <div className={styles.subtitle}>
          Предмет:
          {infoRow.courseName}
        </div>
        <div className={styles.subtitle}>
          Поточна оцінка:
          {infoRow.grade}
        </div>
        <ModalInput
          onChange={(event) => {
            setFormData({ ...formData, grade: +event.target.value });
          }}
          value={formData.grade || ''}
          error={isSubmitted && !formData.grade
            ? 'Оцінку не введено'
            : (formData.grade !== null && formData.grade > 100)
              ? 'Оцінка не може бути більше 100' : ''}
          placeholder="Нова оцінка"
          label="Введіть нову оцінку"
          required
          pattern={OnlyNumbers}
        />
        <SelectReason
          type="modal"
          label="Причина зміни"
          placeholder="Причина зміни"
          required
          isSearchable
          onChange={(value) => {
            setFormData({ ...formData, reasonForChange: value });
          }}
          value={formData.reasonForChange}
          error={isSubmitted && !formData.reasonForChange ? 'Причину зміни не обрано.' : ''}
        />
      </form>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={onSubmit}
        cancelButtonText="Відміна"
        mainButtonText="Зберегти"
      />
    </ModalWindow>
  );
};

export default TeacherRatingEdit;

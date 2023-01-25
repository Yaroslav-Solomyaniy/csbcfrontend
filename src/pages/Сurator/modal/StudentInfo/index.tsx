import React, { useEffect } from 'react';
import clsx from 'clsx';
import ModalWindow from '../../../../components/common/ModalWindow';
import styles from '../../../pagesStyle.module.scss';
import { IEditModal } from '../../../../types';
import ModalControlButtons from '../../../../components/common/ModalControlButtons';
import { DeviceContext } from '../../../../context/All/DeviceType';
import { useGetStudentById } from '../../../../hooks/api/admin/students/useGetById';

const StudentInfo = ({ modalActive, closeModal, studentId }: IEditModal) => {
  const { isPhone } = DeviceContext();
  const { getStudentById, data } = useGetStudentById();

  useEffect(() => {
    if (studentId) getStudentById({ id: +studentId });
  }, [studentId]);

  return (
    <ModalWindow modalTitle="Інформація про студента" active={modalActive} closeModal={closeModal}>
      <div className={styles.infoContent}>
        <form className={clsx(styles.form, isPhone ? styles.formCenter__mobile : styles.formCenter)}>
          <h3 className={clsx(styles.subtitle, styles.left)}>
            {`ПІБ: ${data?.user.lastName}
        ${data?.user.firstName}
        ${data?.user.patronymic}`}
          </h3>
          <h3 className={clsx(styles.subtitle, styles.left)}>{`Група: ${data?.group.name}`}</h3>
          <h3
            className={clsx(styles.subtitle, styles.left)}
          >
            {`Форма навчаня: ${data?.isFullTime ? 'Денна' : 'Заочна'}`}
          </h3>
          <h3 className={clsx(styles.subtitle, styles.left)}>{`Дата народження: ${data?.dateOfBirth}`}</h3>
          <h3 className={clsx(styles.subtitle, styles.left)}>{`Номер наказу: ${data?.orderNumber}`}</h3>
          <h3 className={clsx(styles.subtitle, styles.left)}>{`Номер ЄДЕБО: ${data?.edeboId}`}</h3>
        </form>
      </div>

      <ModalControlButtons
        cancelButtonText="Закрити"
        handleClose={closeModal}
      />
    </ModalWindow>
  );
};

export default StudentInfo;

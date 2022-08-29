import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import StudentModalArrow from '../../../../images/StudentModalArrow.svg';
import { useStudentsContext } from '../../../../context/students';
import Table from '../../../../components/common/table';
import { initialPagination } from '../../../../types';
import { ITableHeader } from '../../../../components/common/table/TableHeader';
import Button from '../../../../components/common/Button';
import StudentsReviewEdit from '../StudentsReviewEdit';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Нізва дисципліни' },
  { id: 2, label: 'Викладач' },
  { id: 3, label: 'Кількість студентів' },
  { id: 4, label: 'Кількість аудиторних годин' },
  { id: 5, label: 'Форма контролю' },
  { id: 6, label: 'Оцінка' },
];

interface IStudentsReviewModal {
  closeModal: () => void;
  modalActive: boolean;
  id: number;
}

const StudentsReview = ({ modalActive, closeModal, id }: IStudentsReviewModal) => {
  const { getStudentById } = useStudentsContext();
  const [modalEditActive, setModalEditActive] = useState(false);

  useEffect(() => {
    if (id) {
      getStudentById?.getStudentId({ id: `${id}` });
    }
  }, [id]);

  return (
    <div className={clsx(modalActive && styles.overlay)}>
      <div className={clsx(styles.modal, modalActive && styles.modal__active)}>
        <div className={styles.content}>
          <button className={styles.cancel} onClick={closeModal} type="button">
            <img className={styles.arrow} src={StudentModalArrow} alt="повернутись" />
            Індивідуальний план студента групи
            {` ${getStudentById?.data?.group.name} ${getStudentById?.data?.user.lastName}
           ${getStudentById?.data?.user.firstName} ${getStudentById?.data?.user.patronymic}`}
          </button>
          <div className={styles.content__subtitle}>
            <h1 className={styles.content__subtitle__h1}>Обовязкові предмети</h1>
          </div>
          <Table
            dataHeader={dataHeader}
            gridColumns={styles.content__columns}
            dataRow={[]}
            pagination={initialPagination}
            onPaginationChange={() => undefined}
          />
          <div className={styles.content__subtitle}>
            <h1 className={styles.content__subtitle__h1}>Вибіркові предмети</h1>
            <Button
              nameClass="secondary"
              size="large"
              className={styles.content__subtitle__actions}
              onClick={() => setModalEditActive(true)}
            >
              Редагувати
            </Button>
          </div>
          <div>
            <Table
              dataHeader={dataHeader}
              gridColumns={styles.content__columns}
              dataRow={[]}
              pagination={initialPagination}
              onPaginationChange={() => undefined}
            />
          </div>

        </div>
        <StudentsReviewEdit closeModal={() => setModalEditActive(false)} modalActive={modalEditActive} />
      </div>
    </div>
  );
};

export default StudentsReview;

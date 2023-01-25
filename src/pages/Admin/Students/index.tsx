import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import TitlePage from '../../../components/common/TitlePage';
import Button from '../../../components/common/Button';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import StudentsCreateModal from './modal/StudentsCreate';
import { StudentsContext } from '../../../context/Pages/admin/Students';
import { initialPagination, IPagination } from '../../../types';
import StudentsEditModal from './modal/StudentsEdit';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import StudentsDelete from './modal/StudentsDelete';
import StudentsReview from './modal/StudentsReview';
import { useQueryParam } from '../../../hooks/hooks/useQueryParams';
import { DeviceContext } from '../../../context/All/DeviceType';
import { EditReviewDelete } from '../../../components/common/CollectionMiniButtons';
import PhoneFilter from '../../../components/common/PhoneFilter';
import StudentsFilters from './Filters';
import Table from '../../../components/common/Table';
import StudentsReviewEdit from './modal/StudentsReviewEdit';
import Preloader from '../../../components/common/Preloader/Preloader';
import useCheckPage from '../../../hooks/hooks/useCheckPage';
import { IGetStudentsParams } from '../../../hooks/api/admin/students/useGet';
import { IStudentData } from '../../../hooks/api/admin/students/interfaces/IStudentData';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ студента' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Номер наказу' },
  { id: 4, label: 'Форма навчання' },
  { id: 5, label: 'E-Mail' },
  { id: 6, label: 'ЄДЕБО' },
  { id: 7, label: 'Дії' },
];

const allCloseModalWindow: Record<string, number | boolean> = {
  create: false,
  boolean: false,
  edit: 0,
  review: 0,
  reviewEdit: false,
  delete: 0,
};

const Students = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveModal, setIsActiveModal] = useState<Record<string, number | boolean>>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ ...initialPagination });

  const { getStudents, editStudent, deleteStudent, createStudent } = StudentsContext();
  const { isPhone } = DeviceContext();
  const { get } = useQueryParam();

  const studentId = Number(get('studentId'));
  const groupId = Number(get('groupId'));
  const isFullTime = String(get('isFullTime'));
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useCheckPage({ pagination, currentPage });

  useEffect(() => {
    const query: IGetStudentsParams = {};

    if (studentId) query.id = studentId;
    if (isFullTime === 'true' || isFullTime === 'false') query.isFullTime = isFullTime === 'true';
    if (groupId) query.group = groupId;
    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    getStudents?.getStudents(query);
  }, [studentId,
    groupId,
    isFullTime,
    currentPage,
    itemsPerPage,
    createStudent?.data,
    editStudent?.data,
    deleteStudent?.data]);

  useEffect(() => {
    if (getStudents?.data) {
      setPagination(getStudents.data.meta);
      setDataRow(getStudents.data.items.map((item: IStudentData) => ({
        list: [
          { id: 1, label: `${item.user.lastName} ${item.user.firstName} ${item.user.patronymic}` || 'Дані відсутні' },
          { id: 2, label: item.group ? item.group.name : 'Група відсутня' },
          { id: 3, label: item.orderNumber || 'Номер наказу відсутній' },
          { id: 4, label: item.isFullTime ? 'Денна' : 'Заочна' },
          { id: 5, label: item.user.email || 'Електронна адреса відсутня' },
          { id: 6, label: item.edeboId || 'ЄДЕБО відсутній' },
          {
            id: 7,
            label: <EditReviewDelete
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
              itemId={item.id}
            />,
          },
        ],
        key: item.id,
      })));
      setIsLoading(false);
    }
  }, [getStudents?.data]);

  return (
    <Layout>
      <TitlePage
        title="Студенти"
        {...isPhone && ({ setIsActiveModal })}
        {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
        action={(
          <Button
            nameClass="primary"
            className={pagesStyle.buttonsCreate}
            size="large"
            onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
          >
            Створити
          </Button>
          )}
      />
      {isLoading ? <Preloader /> : (
        <>
          <Table
            filter={(<StudentsFilters studentId={studentId} groupId={groupId} isFullTime={isFullTime} />)}
            dataHeader={dataHeader}
            dataRow={dataRow}
            gridColumns={styles.columns}
            totalItems={pagination.totalItems}
          />
          <PhoneFilter modalTitle="Фільтрація студентів" isActive={!!isActiveModal.filter} closeModal={closeModal}>
            <StudentsFilters studentId={studentId} groupId={groupId} isFullTime={isFullTime} />
          </PhoneFilter>
          <StudentsCreateModal modalActive={!!isActiveModal.create} closeModal={closeModal} />
          <StudentsEditModal
            modalActive={!!isActiveModal.edit}
            closeModal={closeModal}
            studentId={isActiveModal.edit as number}
          />
          <StudentsDelete
            modalActive={!!isActiveModal.delete}
            closeModal={closeModal}
            studentId={isActiveModal.delete as number}
          />
          <StudentsReview
            modalActive={!!isActiveModal.review}
            closeModal={closeModal}
            id={isActiveModal.review as number}
            Open={() => setIsActiveModal({ ...isActiveModal, reviewEdit: true })}
          />
          <StudentsReviewEdit
            closeModal={() => setIsActiveModal({ ...isActiveModal, reviewEdit: false })}
            modalActive={!!(isActiveModal.reviewEdit)}
          />
        </>
      )}
    </Layout>
  );
};

export default Students;

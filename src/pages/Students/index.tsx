import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import pagesStyle from '../pagesStyle.module.scss';
import Layout from '../../loyout/Layout';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button';
import Table from '../../components/common/table';
import { ITableHeader } from '../../components/common/table/TableHeader';
import StudentsCreateModal from './modal/StudentsCreate';
import { useStudentsContext } from '../../context/students';
import SelectStudent from '../../components/common/Select/SelectStudent';
import SelectIsFullTime from '../../components/common/Select/SelectIsFullTime';
import { initialPagination, Pagination } from '../../types';
import StudentsEditModal from './modal/StudentsEdit';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { IGetParams, IStudentData } from '../../hooks/useStudents';
import StudentsDelete from './modal/StudentsDelete';
import StudentsReview from './modal/StudentsReview';
import SelectGroupById from '../../components/common/Select/SelectGroupById';
import { Delete, Edit, Review } from '../../components/common/Icon';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ студента' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Номер наказу' },
  { id: 4, label: 'Форма навчання' },
  { id: 5, label: 'E-Mail' },
  { id: 6, label: 'ЄДЕБО' },
  { id: 7, label: 'Дії' },
];

interface IIsActiveStudentsModalState {
  create: boolean;
  edit: number;
  review: number;
  delete: number;
}

const allCloseModalWindow: IIsActiveStudentsModalState = {
  create: false,
  edit: 0,
  review: 0,
  delete: 0,
};

interface Filter {
  studentId: number | null;
  group: string;
  isFullTime: boolean | undefined;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const Students = (): JSX.Element => {
  const { getStudents } = useStudentsContext();
  const [isActiveModal, setIsActiveModal] = useState<IIsActiveStudentsModalState>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [params, setParams] = useState<Params>({
    filter: { studentId: null, group: '', isFullTime: undefined },
    pagination: initialPagination,
  });
  const { page } = useParams();

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    const query: IGetParams = {};

    if (params.filter.studentId) query.id = params.filter.studentId;
    if (params.filter.isFullTime) query.isFullTime = params.filter.isFullTime;
    if (params.filter.group) query.group = params.filter.group;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getStudents?.getStudents(query);
  }, [params.filter.group,
    params.filter.studentId,
    params.filter.isFullTime,
    params.pagination.currentPage,
    params.pagination.itemsPerPage]);

  useEffect(() => {
    if (getStudents?.data) {
      setParams({ ...params, pagination: getStudents.data.meta });
      setDataRow(getStudents.data.items.map((item: IStudentData) => ({
        list: [
          { id: 1, label: `${item.user.lastName} ${item.user.firstName} ${item.user.patronymic}` },
          { id: 2, label: item.group.name },
          { id: 3, label: item.orderNumber },
          { id: 4, label: item.isFullTime ? 'Денна' : 'Заочна' },
          { id: 5, label: item.user.email },
          { id: 6, label: item.edeboId },
          {
            id: 7,
            label: (
              <div className={pagesStyle.actions}>
                <Button
                  isImg
                  type="button"
                  onClick={() => {
                    setIsActiveModal({ ...allCloseModalWindow, edit: item.id });
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  isImg
                  type="button"
                  onClick={() => {
                    setIsActiveModal({ ...allCloseModalWindow, review: item.id });
                  }}
                >
                  <Review />
                </Button>
                <Button
                  isImg
                  type="button"
                  onClick={() => {
                    setIsActiveModal({ ...allCloseModalWindow, delete: item.id });
                  }}
                >
                  <Delete />
                </Button>
              </div>
            ),
          },
        ],
        key: item.id,
      })));
    }
  }, [getStudents?.data]);

  return (
    <Layout>
      <div>
        <TitlePage
          title="Студенти"
          action={(
            <Button
              nameClass="primary"
              size="large"
              className={pagesStyle.buttonsCreate}
              onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
            >
              Створити
            </Button>
          )}
        />
        <Table
          filter={(
            <>
              <SelectStudent
                type="filter"
                placeholder="ПІБ"
                value={params.filter.studentId}
                onChange={(value) => setParams({ ...params, filter: { ...params.filter, studentId: +value } })}
                isClearable
                isSearchable
                isFilter
              />
              <SelectGroupById
                type="filter"
                placeholder="Група"
                value={params.filter.group}
                onChange={(value) => setParams({
                  ...params,
                  filter: {
                    ...params.filter,
                    group: value,
                  },
                })}
                isClearable
                isSearchable
                isFilter
              />
              <SelectIsFullTime
                type="filter"
                placeholder="Форма навчання"
                value={params.filter.isFullTime}
                onChange={(value) => setParams({
                  ...params,
                  filter: {
                    ...params.filter,
                    isFullTime: value === 'Денна' ? true : value === '' ? undefined : false,
                  },
                })}
                isFilter
                isSearchable
                isClearable
              />
            </>
          )}
          dataHeader={dataHeader}
          gridColumns={styles.columns}
          dataRow={dataRow}
          pagination={params.pagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <StudentsCreateModal modalActive={isActiveModal.create} closeModal={closeModal} />
        <StudentsEditModal modalActive={!!isActiveModal.edit} closeModal={closeModal} studentId={isActiveModal.edit} />
        <StudentsDelete modalActive={!!isActiveModal.delete} closeModal={closeModal} studentId={isActiveModal.delete} />
        <StudentsReview modalActive={!!isActiveModal.review} closeModal={closeModal} id={isActiveModal.review} />
      </div>
    </Layout>
  );
};

export default Students;

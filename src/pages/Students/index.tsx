import React, { useEffect, useState } from 'react';
import styles from '../Group/index.module.scss';
import stylesStud from './index.module.scss';
import Layout from '../../loyout/Layout';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button';
import Table from '../../components/common/table';
import { ITableHeader } from '../../components/common/table/TableHeader';
import StudentsCreateModal from './modal/StudentsCreate';
import { useStudentsContext } from '../../context/students';
import SelectGroup from '../../components/common/Select/SelectGroup';
import SelectPIB from '../../components/common/Select/SelectStudent';
import SelectIsFullTime from '../../components/common/Select/SelectIsFullTime';
import edit from '../../images/table/edit.svg';
import review from '../../images/table/review.svg';
import del from '../../images/table/delete.svg';
import { initialPagination, Pagination } from '../../types';
import StudentsEditModal from './modal/StudentsEdit';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { IDataStudentsItems, IGetParams } from '../../hooks/useStudents';
import StudentsDelete from './modal/StudentsDelete';
import StudentsReview from './modal/StudentsReview';
import SelectGroupByName from '../../components/common/Select/SelectGroupByName';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІП студента' },
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
  const { getStudents, getStudent, createStudents, deleteStudentsItem, patchStudentsItem } = useStudentsContext();
  const [isActiveModal, setIsActiveModal] = useState<IIsActiveStudentsModalState>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [params, setParams] = useState<Params>({
    filter: { studentId: null, group: '', isFullTime: undefined },
    pagination: initialPagination,
  });
  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  const tableRows = (arrTableRows: IDataStudentsItems[]) => (
    arrTableRows.length ? arrTableRows.map((item) => ({
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
            <div className={styles.actions}>
              <Button
                isImg
                type="button"
                className={styles.actions__button_edit}
                onClick={() => {
                  setIsActiveModal({ ...allCloseModalWindow, edit: item.id });
                }}
              >
                <img src={edit} alt="edit" />
              </Button>
              <Button
                isImg
                type="button"
                className={styles.actions__button_delete}
                onClick={() => {
                  setIsActiveModal({ ...allCloseModalWindow, review: item.id });
                }}
              >
                <img src={review} alt="review" />
              </Button>
              <Button
                isImg
                type="button"
                className={styles.actions__button_delete}
                onClick={() => {
                  setIsActiveModal({ ...allCloseModalWindow, delete: item.id });
                }}
              >
                <img src={del} alt="delete" />
              </Button>
            </div>
          ),
        },
      ],
      key: item.id,
    })) : []);

  useEffect(() => {
    getStudents?.getStudent({});
  }, [createStudents?.data, patchStudentsItem?.data, deleteStudentsItem?.data]);

  useEffect(() => {
    if (params.filter.studentId) {
      getStudent?.getStudent({ id: `${params.filter.studentId}` });
    } else {
      const query: IGetParams = {};

      if (params.filter.isFullTime) query.isFullTime = params.filter.isFullTime;
      if (params.filter.group) query.group = params.filter.group;
      if (params.pagination.currentPage) query.page = params.pagination.currentPage;
      if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

      getStudents?.getStudent(query);
    }
  }, [
    params.filter.group,
    params.filter.studentId,
    params.filter.isFullTime,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
  ]);

  useEffect(() => {
    if (getStudents?.data) {
      setParams({ ...params, pagination: getStudents.data.meta });
      setDataRow(params.filter.studentId && getStudent?.data != null
        ? tableRows([getStudent?.data])
        : tableRows(getStudents?.data.items));
    }
  }, [getStudents?.data, getStudent?.data]);

  return (
    <Layout>
      <div className={styles.students}>
        <TitlePage
          title="Студенти"
          action={(
            <Button
              nameClass="primary"
              size="large"
              className={styles.actions}
              onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
            >
              Створити
            </Button>
          )}
        />
        <Table
          filter={(
            <>
              <SelectGroupByName
                type="filter"
                placeholder="Група"
                value={params.filter.group}
                onChange={(value) => setParams({
                  ...params,
                  filter: {
                    ...params.filter,
                    group: value,
                    studentId: null,
                  },
                })}
                isClearable
                isSearchable
              />
              <SelectPIB
                type="filter"
                placeholder="ПІБ"
                value={params.filter.studentId}
                onChange={(value) => setParams({ ...params, filter: { ...params.filter, studentId: +value } })}
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
                    studentId: null,
                  },
                })}
              />
            </>
          )}
          dataHeader={dataHeader}
          gridColumns={stylesStud.columns}
          dataRow={dataRow}
          pagination={initialPagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <StudentsCreateModal modalActive={isActiveModal.create} closeModal={closeModal} />
        <StudentsEditModal modalActive={!!isActiveModal.edit} closeModal={closeModal} id={isActiveModal.edit} />
        <StudentsDelete modalActive={!!isActiveModal.delete} closeModal={closeModal} studentId={isActiveModal.delete} />
        <StudentsReview modalActive={!!isActiveModal.review} closeModal={closeModal} id={isActiveModal.review} />
      </div>
    </Layout>
  );
};

export default Students;

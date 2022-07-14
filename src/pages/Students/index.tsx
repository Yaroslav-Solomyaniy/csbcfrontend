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
import SelectGroup from '../../components/common/SelectGroup';
import SelectPIB from '../../components/common/SelectPIB';
import SelectIsFullTime from '../../components/common/SelectIsFullTime';
import edit from '../../images/table/edit.svg';
import review from '../../images/table/review.svg';
import del from '../../images/table/delete.svg';
import { initialPagination, Pagination } from '../../types';
import StudentsEditModal from './modal/StudentsEdit';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { IGetParams } from '../../hooks/useStudents';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІП студента' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Номер наказу' },
  { id: 4, label: 'Форма навчання' },
  { id: 5, label: 'E-Mail' },
  { id: 6, label: 'ЄДЕБО' },
  { id: 7, label: 'Дії' },
];

interface IIsActiveSudentsModalState {
  create: boolean;
  edit: number;
  review: number;
  delete: number;
}

const allCloseModalWindow: IIsActiveSudentsModalState = {
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
  const { getStudents, createStudents, deleteStudentsItem, patchStudentsItem } = useStudentsContext();
  const [isActiveModal, setIsActiveModal] = useState<IIsActiveSudentsModalState>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [params, setParams] = useState<Params>({
    filter: { studentId: null, group: '', isFullTime: undefined },
    pagination: initialPagination,
  });
  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    getStudents?.getStudent({});
  }, [createStudents?.data, patchStudentsItem?.data, deleteStudentsItem?.data]);

  useEffect(() => {
    const query: IGetParams = {};

    // if (params.filter.studentId) query.id = params.filter.studentId;
    if (params.filter.isFullTime) query.isFullTime = params.filter.isFullTime;
    if (params.filter.group) query.group = params.filter.group;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getStudents?.getStudent(query);
  }, [
    params.filter.group,
    params.filter.isFullTime,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
  ]);

  useEffect(() => {
    if (getStudents?.data) {
      setParams({ ...params, pagination: getStudents.data.meta });
      setDataRow(getStudents?.data?.items.length ? getStudents?.data?.items.map((item) => ({
        list: [
          { id: 1, label: `${item.user.lastName} ${item.user.firstName}` },
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
                    setIsActiveModal({ ...isActiveModal, edit: item.id });
                  }}
                >
                  <img src={edit} alt="edit" />
                </Button>
                <Button
                  isImg
                  type="button"
                  className={styles.actions__button_delete}
                  onClick={() => {
                    setIsActiveModal({ ...isActiveModal, review: item.id });
                  }}
                >
                  <img src={review} alt="review" />
                </Button>
                <Button
                  isImg
                  type="button"
                  className={styles.actions__button_delete}
                  onClick={() => {
                    setIsActiveModal({ ...isActiveModal, delete: item.id });
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
    }
  }, [getStudents?.data]);

  return (
    <Layout>
      <div className={styles.group}>
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
              <SelectGroup
                type="filter"
                placeholder="Група"
                value={params.filter.group}
                onChange={(value) => setParams({ ...params, filter: { ...params.filter, group: value } })}
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
        <StudentsCreateModal closeModal={closeModal} modalActive={isActiveModal.create} />
        <StudentsEditModal closeModal={closeModal} modalActive={!!isActiveModal.edit} id={isActiveModal.edit} />
      </div>
    </Layout>
  );
};

export default Students;

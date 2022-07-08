import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import stylesGroup from '../Group/index.module.scss';
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
import { ITableRowItem } from '../../components/common/table/TableBody';
import { IGetParams } from '../../hooks/useStudents';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІП студента' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Номер Наказу' },
  { id: 4, label: 'Форма навчання' },
  { id: 5, label: 'E-Mail' },
  { id: 6, label: 'ЄДЕБО' },
  { id: 7, label: 'Дії' },
];

interface IIsActiveModalState {
  create: boolean;
  edit: number;
  review: number;
  delete: number;
}

const allCloseModalWindow: IIsActiveModalState = {
  create: false,
  edit: 0,
  review: 0,
  delete: 0,
};

interface Filter {
  name: string;
  group: string;
  isFullTime: boolean | undefined;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const Students = (): JSX.Element => {
  const { getStudents } = useStudentsContext();
  const [params, setParams] = useState<Params>({
    filter: { name: '', group: '', isFullTime: undefined },
    pagination: initialPagination,
  });
  const [modalActive, setModalActive] = useState(false);

  const closeModal = () => {
    setModalActive(false);
  };

  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  useEffect(() => {
    const query: IGetParams = {};

    if (params.filter.group) query.isFullTime = params.filter.isFullTime;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getStudents?.getStudent(query);
  }, [
    params.filter.group,
    params.filter.name,
    params.filter.isFullTime,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
  ]);

  useEffect(() => {
    if (getStudents?.data) {
      setParams({ ...params, pagination: getStudents.data.meta });
      setDataRow(getStudents?.data?.items.length
        ? getStudents?.data?.items.map((item, id) => ({
          list: [
            { id, label: `${item.user.lastName} ${item.user.firstName}` },
            { id, label: item.group.name },
            { id, label: item.orderNumber },
            { id, label: item.isFullTime ? 'Денна' : 'Заочна' },
            { id, label: item.user.email },
            { id, label: item.user.firstName },
            {
              id,
              label: (
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={stylesGroup.actions}
                    onClick={() => {
                      setIsActiveModal({ ...isActiveModal, edit: item.id });
                    }}
                  >
                    <img src={edit} alt="edit" />
                  </button>
                  <button
                    type="button"
                    className={stylesGroup.actions}
                    onClick={() => {
                      setIsActiveModal({ ...isActiveModal, review: item.id });
                    }}
                  >
                    <img src={review} alt="delete" />
                  </button>
                  <button
                    type="button"
                    className={stylesGroup.actions}
                    onClick={() => {
                      setIsActiveModal({ ...isActiveModal, delete: item.id });
                    }}
                  >
                    <img src={del} alt="delete" />
                  </button>
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
              onClick={() => setModalActive(true)}
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
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, group: value },
                  pagination: initialPagination,
                })}
                isClearable
                isSearchable
              />
              <SelectPIB
                type="filter"
                placeholder="ПІБ"
                value={params.filter.name}
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, name: value },
                  pagination: initialPagination,
                })}
              />
              <SelectIsFullTime
                type="filter"
                placeholder="Форма навчання"
                value={params.filter.isFullTime ? 'Денна' : params.filter.isFullTime === undefined ? '' : 'Заочна'}
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, isFullTime: value === 'Денна' ? true : value === '' ? undefined : false },
                  pagination: initialPagination,
                })}
              />
            </>
          )}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          pagination={params.pagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <StudentsCreateModal closeModal={closeModal} modalActive={modalActive} />
      </div>
    </Layout>
  );
};

export default Students;

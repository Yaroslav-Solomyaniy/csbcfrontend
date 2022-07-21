import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { useStudentsContext } from '../../context/students';
import { initialPagination, Pagination } from '../../types';
import { IDataStudentsItems, IGetParams } from '../../hooks/useStudents';
import Button from '../../components/common/Button';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';
import TitlePage from '../../components/TitlePage';
import Table from '../../components/common/table';
import SelectGroup from '../../components/common/Select/SelectGroup';
import SelectPIB from '../../components/common/Select/SelectPIB';
import SelectCourse from '../../components/common/Select/SelectCourse';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІП' },
  { id: 2, label: 'Предмет' },
  { id: 3, label: 'Група' },
  { id: 4, label: 'E-Mail' },
  { id: 5, label: 'Дії' },
];

interface IIsActiveTeacherModalState {
  create: boolean;
  edit: number;
  delete: number;
}

const allCloseModalWindow: IIsActiveTeacherModalState = {
  create: false,
  edit: 0,
  delete: 0,
};

interface Filter {
  teacherId: number | null;
  group: string;
  name: string;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const Teachers = (): JSX.Element => {
  const { getStudents, getStudent, createStudents, deleteStudentsItem, patchStudentsItem } = useStudentsContext();
  const [isActiveModal, setIsActiveModal] = useState<IIsActiveTeacherModalState>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [params, setParams] = useState<Params>({
    filter: { teacherId: null, group: '', name: '' },
    pagination: initialPagination,
  });
  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  const tableRows = (arrTableRows: IDataStudentsItems[]) => (
    arrTableRows.length ? arrTableRows.map((item) => ({
      list: [
        { id: 1, label: `${item.orderNumber}` },
        { id: 2, label: item.orderNumber },
        { id: 3, label: item.orderNumber },
        { id: 4, label: item.orderNumber },
        {
          id: 5,
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
    if (params.filter.teacherId) {
      getStudent?.getStudent({ id: `${params.filter.teacherId}` });
    } else {
      const query: IGetParams = {};

      if (params.filter.group) query.group = params.filter.group;
      if (params.pagination.currentPage) query.page = params.pagination.currentPage;
      if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

      getStudents?.getStudent(query);
    }
  }, [
    params.filter.group,
    params.filter.teacherId,
    params.filter.name,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
  ]);

  useEffect(() => {
    if (getStudents?.data) {
      setParams({ ...params, pagination: getStudents.data.meta });
      setDataRow(params.filter.teacherId && getStudent?.data != null
        ? tableRows([])
        : tableRows([]));
    }
  }, [getStudents?.data, getStudent?.data]);

  return (
    <Layout>
      <div className={styles.students}>
        <TitlePage
          title="Викладачі"
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
              <SelectPIB
                type="filter"
                placeholder="ПІБ"
                value={params.filter.teacherId}
                onChange={(value) => setParams({ ...params, filter: { ...params.filter, teacherId: +value } })}
              />
              <SelectGroup
                type="filter"
                placeholder="Група"
                value={params.filter.group}
                onChange={(value) => setParams({
                  ...params,
                  filter: {
                    ...params.filter,
                    group: value,
                    teacherId: null,
                  },
                })}
                isClearable
                isSearchable
              />
              <SelectCourse
                type="filter"
                placeholder="Предмет"
                required
                isClearable
                isSearchable
                value={params.filter.name}
                onChange={(value) => setParams({
                  ...params,
                  filter: {
                    ...params.filter,
                    name: value,
                    teacherId: null,
                  },
                })}
              />
            </>
          )}
          dataHeader={dataHeader}
          gridColumns={styles.columns}
          dataRow={dataRow}
          pagination={initialPagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
      </div>
    </Layout>
  );
};

export default Teachers;

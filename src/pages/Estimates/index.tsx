import React, { useEffect, useState } from 'react';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { initialPagination, Pagination } from '../../types';
import { useTeachersContext } from '../../context/teachers';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { IGetTeacherData } from '../../hooks/useTeachers';
import styles from '../Teachers/index.module.scss';
import Button from '../../components/common/Button';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';
import SelectStudent from '../../components/common/Select/SelectStudent';
import SelectGroupById from '../../components/common/Select/SelectGroupById';
import TitlePage from '../../components/TitlePage';
import Table from '../../components/common/table';

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

const Estimates = (): JSX.Element => {
  const { getTeacher } = useTeachersContext();
  const [isActiveModal, setIsActiveModal] = useState<IIsActiveTeacherModalState>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [params, setParams] = useState<Params>({
    filter: { teacherId: 0, group: '', name: '' },
    pagination: initialPagination,
  });

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  const tableRows = (arrTableRows: IGetTeacherData[]) => (
    arrTableRows.length ? arrTableRows.map((item) => {
      const arr: { subject: string[]; group: string[]; } = { subject: [], group: [] };

      item.courses.forEach((subject) => {
        arr.subject.push(subject.name);
        let srt = '';

        subject.groups.forEach((group) => {
          srt += ` ${group.name}`;
        });
        arr.group.push(srt);
      });

      return {
        list: [
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` },
          { id: 2, label: arr.subject },
          { id: 3, label: arr.group },
          { id: 4, label: item.email },
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
      };
    }) : []);

  useEffect(() => {
    if (params.filter.teacherId) {
      // getTeacher?.getTeacher({});
    } else {
      // const query: IGetTeacherParams = {};
      //
      // if (params.filter.group) query.group = params.filter.group;
      // if (params.pagination.currentPage) query.page = params.pagination.currentPage;
      // if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;
      //
      // getTeacher?.getTeacher(query);
    }
  }, [
    params.filter.group,
    params.filter.teacherId,
    params.filter.name,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
  ]);

  // useEffect(() => {
  //   if (getTeacher?.data) {
  //     setParams({ ...params, pagination: getTeacher.data.meta });
  //     setDataRow(tableRows(getTeacher?.data ? getTeacher?.data.items : []));
  //   }
  // }, [getTeacher?.data]);

  return (
    <Layout>
      <div className={styles.students}>
        <TitlePage
          title="Оцінки"
          action={(
            <Button
              nameClass="primary"
              size="large"
              className={styles.actions}
              onClick={() => {
                setIsActiveModal({ ...allCloseModalWindow, create: true });
              }}
            >
              Створити
            </Button>
          )}
        />
        <Table
          filter={(
            <>
              <SelectGroupById
                type="filter"
                placeholder="Група"
                required
                isClearable
                isSearchable
                value={params.filter.group}
                onChange={(value) => setParams({
                  ...params,
                  filter: {
                    ...params.filter,
                    group: value,
                    teacherId: null,
                  },
                })}
              />
              <SelectStudent
                type="filter"
                placeholder="ПІБ"
                value={params.filter.teacherId}
                onChange={(value) => setParams({
                  ...params, filter: { ...params.filter, teacherId: +value },
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

export default Estimates;

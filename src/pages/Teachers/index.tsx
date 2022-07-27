import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';
import Button from '../../components/common/Button';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';
import TitlePage from '../../components/TitlePage';
import Table from '../../components/common/table';
import SelectGroup from '../../components/common/Select/SelectGroup';
import SelectPIB from '../../components/common/Select/SelectPIB';
import SelectCourse from '../../components/common/Select/SelectCourse';
import { useTeachersContext } from '../../context/teachers';
import { IGetTeacherData, IGetTeacherParams } from '../../hooks/useTeachers';
import TeachersDelete from './modal/TeachersDelete';
import TeachersCreate from './modal/TeachersCreate';

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
  const { getTeacher } = useTeachersContext();
  const [isActiveModal, setIsActiveModal] = useState<IIsActiveTeacherModalState>(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [params, setParams] = useState<Params>({
    filter: { teacherId: null, group: '', name: '' },
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

  // useEffect(() => {
  //   getStudents?.getStudent({});
  // }, [createStudents?.data, patchStudentsItem?.data, deleteStudentsItem?.data]);

  useEffect(() => {
    if (params.filter.teacherId) {
      getTeacher?.getTeacher({});
    } else {
      const query: IGetTeacherParams = {};

      // if (params.filter.group) query.group = params.filter.group;
      if (params.pagination.currentPage) query.page = params.pagination.currentPage;
      if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

      getTeacher?.getTeacher(query);
    }
  }, [
    params.filter.group,
    params.filter.teacherId,
    params.filter.name,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
  ]);

  useEffect(() => {
    if (getTeacher?.data) {
      setParams({ ...params, pagination: getTeacher.data.meta });
      setDataRow(tableRows(getTeacher?.data ? getTeacher?.data.items : []));
    }
  }, [getTeacher?.data]);

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
        <TeachersCreate modalActive={isActiveModal.create} closeModal={closeModal} />
        <TeachersDelete modalActive={!!isActiveModal.delete} closeModal={closeModal} studentId={isActiveModal.delete} />
      </div>
    </Layout>
  );
};

export default Teachers;

import React, { useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';
import { TeacherRatingEdit } from './RatingEdit';
import TeacherRatingHistory from './RatingHistory';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Оцінка' },
  { id: 4, label: 'Предмет' },
  { id: 5, label: 'Дії' },
];

interface IIsActiveModalState {
  edit: number;
  history: number;
}

const allCloseModalWindow: IIsActiveModalState = {
  edit: 0,
  history: 0,
};

interface Filter {
  student: string;
  group: string;
  course: string;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const TeacherPage = (): JSX.Element => {
  const [params, setParams] = useState<Params>({
    filter: { student: '', group: '', course: '' },
    pagination: initialPagination,
  });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  /*  useEffect(() => {
    const query: IGetGroupParams = {};

    if (params.filter.student) query.curatorId = +params.filter.student;
    if (params.filter.group) query.name = params.filter.group;
    if (params.filter.course) query.curatorId = +params.filter.course;

    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getGroups?.getGroups(query);
  }, [params.filter.group,
    params.filter.course,
    params.filter.student,
    params.pagination.currentPage,
    params.pagination.itemsPerPage]); */

  /* useEffect(() => {
    if (getGroups?.data) {
      setParams({ ...params, pagination: getGroups.data.meta });
      setDataRow(getGroups?.data?.items.map((item: IGroupData) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2, label: `${item.curator.lastName} ${item.curator.firstName} ${item.curator.patronymic}` },
          { id: 3, label: item.orderNumber },
          { id: 4, label: `${item.students}` },
          {
            id: 5,
            label: (
              <div className={pagesStyle.actions}>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
                  isImg
                >
                  <img src={edit} alt="edit" />
                </Button>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, delete: item.id })}
                  isImg
                >
                  <img src={del} alt="delete" />
                </Button>
              </div>
            ),
          },
        ],
        key: item.id,
      })));
    }
  }, [getGroups?.data]); */

  return (
    <Layout>
      <div>
        <TitlePage
          title="Студенти"
          action={(
            <>
              <Button
                nameClass="primary"
                size="large"
                onClick={() => setIsActiveModal({ ...isActiveModal, edit: 1 })}
              >
                Редагування
              </Button>
              <Button
                nameClass="primary"
                size="large"
                onClick={() => setIsActiveModal({ ...isActiveModal, history: 1 })}
              >
                Історія змін оцінок
              </Button>
            </>
          )}
        />
        <Table
          /* filter={(
             <>
               <SelectStudent
                 type="filter"
                 placeholder="ПІБ"
                 onChange={(value) => setParams({
                   ...params,
                   filter: { ...params.filter, student: value },
                   pagination: initialPagination,
                 })}
                 value={+params.filter.student}
                 isClearable
                 isSearchable
               />
               <SelectGroupByName
                 type="filter"
                 placeholder="Група"
                 onChange={(value) => setParams({
                   ...params,
                   filter: { ...params.filter, group: value },
                   pagination: initialPagination,
                 })}
                 value={params.filter.group}
                 isClearable
                 isSearchable
               />
               <SelectCourse
                 type="filter"
                 placeholder="Предмет"
                 onChange={(value) => setParams({
                   ...params,
                   filter: { ...params.filter, course: value },
                   pagination: initialPagination,
                 })}
                 value={params.filter.course}
                 isClearable
                 isSearchable
               />
             </>
           )} */
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          pagination={params.pagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <TeacherRatingEdit modalActive={!!isActiveModal.edit} studentId={isActiveModal.edit} closeModal={closeModal} />
        <TeacherRatingHistory
          modalActive={!!isActiveModal.history}
          studentId={isActiveModal.history}
          closeModal={closeModal}
        />
      </div>
    </Layout>
  );
};

TeacherPage.defaultProps = {
  filter: '',
};

export default TeacherPage;

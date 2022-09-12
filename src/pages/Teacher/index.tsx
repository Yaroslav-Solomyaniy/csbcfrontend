import React, { useEffect, useState } from 'react';
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
import pagesStyle from '../pagesStyle.module.scss';
import SelectStudent from '../../components/common/Select/SelectStudent';
import SelectCourse from '../../components/common/Select/SelectCourse';
import { useTeacherPageContext } from '../../context/pageTeacher';
import { IGetPageTeacherData, IGetPageTeacherParams } from '../../hooks/usePageTeacher';
import SelectGroupById from '../../components/common/Select/SelectGroupById';
import { History, Edit } from '../../components/common/Icon';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Предмет' },
  { id: 4, label: 'Оцінка' },
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
  const { teacherDataGet } = useTeacherPageContext();
  const [params, setParams] = useState<Params>({
    filter: { student: '', group: '', course: '' },
    pagination: initialPagination,
  });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    const query: IGetPageTeacherParams = {};

    if (params.filter.student) query.studentId = +params.filter.student;
    if (params.filter.group) query.groupId = +params.filter.group;
    if (params.filter.course) query.courseId = +params.filter.course;

    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    teacherDataGet?.pageTeacherGet(query);
  }, [params.filter.group,
    params.filter.course,
    params.filter.student,
    params.pagination.currentPage,
    params.pagination.itemsPerPage]);

  useEffect(() => {
    if (teacherDataGet?.data) {
      setParams({ ...params, pagination: teacherDataGet.data.meta });
      setDataRow(teacherDataGet?.data?.items.map((item: IGetPageTeacherData) => ({
        list: [
          { id: 1,
            label:
              `${item.student.user.lastName}
              ${item.student.user.firstName}
              ${item.student.user.patronymic}` },
          { id: 2, label: item.student.group.name },
          { id: 3, label: item.course.name },
          { id: 4, label: item.grade },
          {
            id: 5,
            label: (
              <div className={pagesStyle.actions}>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
                  isImg
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, history: item.id })}
                  isImg
                >
                  <History />
                </Button>
              </div>
            ),
          },
        ],
        key: item.id,
      })));
    }
  }, [teacherDataGet?.data]);

  return (
    <Layout>
      <div>
        <TitlePage title="Студенти" />
        <Table
          filter={(
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
              <SelectGroupById
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
           )}
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

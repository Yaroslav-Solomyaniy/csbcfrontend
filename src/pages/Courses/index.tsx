import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';
import { useCourseContext } from '../../context/course';
import { IGetCoursesData, IGetCoursesParams } from '../../hooks/useCourses';
import SelectCourse from '../../components/common/Select/SelectCourse';
import SelectGroup from '../../components/common/Select/SelectGroup';
import SelectCompulsory from '../../components/common/Select/SelectCompulsory';
import SelectTeacher from '../../components/common/Select/SelectTeacher';
import CourseCreateModal from './CourseCreate';
import CourseEditModal from './CourseEdit';
import CourseDeleteModal from './CourseDelete';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Назва' },
  { id: 2, label: 'Викладач' },
  { id: 3, label: 'Семестр' },
  { id: 4, label: 'Кредити' },
  { id: 5, label: 'Групи' },
  { id: 6, label: 'Ауд.Години' },
  { id: 7, label: 'Вид контролю' },
  { id: 8, label: 'Вид проведення' },
  { id: 9, label: 'Дії' },
];

export interface IIsActiveModalState {
  create: boolean;
  edit: number;
  delete: number;
}

const allCloseModalWindow: IIsActiveModalState = {
  create: false,
  edit: 0,
  delete: 0,
};

interface Filter {
  course: string;
  teacher: string;
  group: string;
  conduct: string;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const Courses = (): JSX.Element => {
  const { getCourses, courseDelete, courseEdit, courseCreate } = useCourseContext();
  const [params, setParams] = useState<Params>({
    filter: { course: '', teacher: '', group: '', conduct: '' },
    pagination: initialPagination,
  });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    getCourses?.getCourses();
  }, [courseCreate?.data, courseEdit?.data, courseDelete?.data]);

  useEffect(() => {
    const query: IGetCoursesParams = {};

    if (params.filter.course) query.name = params.filter.course;
    if (params.filter.teacher) query.teacher = +params.filter.teacher;
    if (params.filter.group) {
      if (query.groups) {
        query.groups.name = params.filter.group;
      }
    }
    if (params.filter.conduct === 'true' || params.filter.conduct === 'false') {
      query.isCompulsory = params.filter.conduct === 'true';
    }

    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getCourses?.getCourses(query);
  }, [params.filter.course,
    params.filter.teacher,
    params.filter.group,
    params.filter.conduct,
    params.pagination.currentPage,
    params.pagination.itemsPerPage]);

  useEffect(() => {
    if (getCourses?.data) {
      setParams({ ...params, pagination: getCourses.data.meta });
      setDataRow(getCourses?.data?.items.map((item: IGetCoursesData) => ({
        list: [
          { id: 1, label: item.name },
          { id: 2, label: `${item.teacher.lastName} ${item.teacher.firstName} ${item.teacher.patronymic}` },
          { id: 3, label: item.semester },
          { id: 4, label: `${item.credits}` },
          { id: 5, label: item.groups.map((group) => group.name).join(',') },
          { id: 6, label: `${item.lectureHours}` },
          { id: 7, label: item.isActive ? 'Екзамен' : 'Залік' },
          { id: 8, label: item.isCompulsory ? "Обов'язковий" : "Не обов'язковий" },
          {
            id: 9,
            label: (
              <div className={styles.actions}>
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
  }, [getCourses?.data]);

  return (
    <Layout>
      <div className={styles.group}>
        <TitlePage
          title="Предмети"
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
              <SelectTeacher
                type="filter"
                placeholder="ПІБ"
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, teacher: value },
                  pagination: initialPagination,
                })}
                value={params.filter.teacher}
                isClearable
                isSearchable
              />
              <SelectGroup
                type="filter"
                placeholder="Групи"
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, group: value },
                  pagination: initialPagination,
                })}
                value={params.filter.group}
                isClearable
                isSearchable
              />
              <SelectCompulsory
                type="filter"
                placeholder="Вид проведення"
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, conduct: value.toString() },
                  pagination: initialPagination,
                })}
                value={params.filter.conduct}
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
        <CourseCreateModal
          modalActive={isActiveModal.create}
          closeModal={closeModal}
        />
        <CourseEditModal
          modalActive={!!isActiveModal.edit}
          Id={isActiveModal.edit}
          closeModal={closeModal}
        />
        <CourseDeleteModal
          modalActive={!!isActiveModal.delete}
          Id={isActiveModal.delete}
          closeModal={closeModal}
        />
      </div>
    </Layout>
  );
};

Courses.defaultProps = {
  filter: '',
};

export default Courses;

import React, { useEffect, useState } from 'react';
import TitlePage from '../../../components/common/TitlePage';
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import pagesStyle from '../../pagesStyle.module.scss';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { initialPagination, IPagination, Semesters } from '../../../types';
import { CoursesContext } from '../../../context/Pages/admin/Courses';
import CourseCreateModal from './modal/CourseCreate';
import CourseEditModal from './modal/CourseEdit';
import CourseDeleteModal from './modal/CourseDelete';
import { DeviceContext } from '../../../context/All/DeviceType';
import { AddQueryParams, useQueryParam } from '../../../hooks/hooks/useQueryParams';
import { EditAndDelete } from '../../../components/common/CollectionMiniButtons';
import CoursesFilters from './Filters';
import PhoneFilter from '../../../components/common/PhoneFilter';
import Table from '../../../components/common/Table';
import Preloader from '../../../components/common/Preloader/Preloader';
import useChangePage from '../../../hooks/hooks/useCheckPage';
import { IGetCoursesData } from '../../../hooks/api/admin/courses/useGet';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Назва' },
  { id: 2, label: 'Викладач' },
  { id: 3, label: 'Семестр' },
  { id: 4, label: 'Кредити' },
  { id: 5, label: 'Групи' },
  { id: 6, label: 'Ауд.години' },
  { id: 7, label: 'Вид контролю' },
  { id: 8, label: 'Вид проведення' },
  { id: 9, label: 'Дії' },
];

const allCloseModalWindow: Record<string, number | boolean> = {
  create: false,
  filter: false,
  edit: 0,
  delete: 0,
};

const Courses = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ ...initialPagination });

  const { getCourses, createCourse, deleteCourse, editCourse } = CoursesContext();
  const { isPhone } = DeviceContext();
  const { get } = useQueryParam();

  const courseId = Number(get('courseId'));
  const groupId = Number(get('groupId'));
  const teacherId = Number(get('teacherId'));
  const courseType = get('courseType') || '';
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useChangePage({ pagination, currentPage });

  useEffect(() => {
    getCourses?.getCourses(
      AddQueryParams({ id: courseId,
        groups: groupId,
        teacher: teacherId,
        type: courseType.toString(),
        page: currentPage,
        limit: itemsPerPage }),
    );
  }, [courseId, groupId, teacherId, courseType, currentPage,
    itemsPerPage, createCourse?.data, editCourse?.data, deleteCourse?.data]);

  useEffect(() => {
    if (getCourses?.data) {
      setPagination(getCourses.data.meta);
      setDataRow(getCourses?.data?.items.map((item: IGetCoursesData) => ({
        list: [
          { id: 1, label: item.name || 'Назва предмету відсутня' },
          {
            id: 2,
            label: (item.teacher
              ? `${item?.teacher?.lastName} ${item?.teacher?.firstName} ${item?.teacher?.patronymic}`
              : 'Викладач відсутній'),
          },
          { id: 3, label: Semesters[item.semester] || 'Семестр відсутній' },
          { id: 4, label: item.credits || 'К-ть кредитів відсутня' },
          { id: 5, label: item.groups.length ? item.groups.map((group) => group.name).join(',') : 'Групи відсутні' },
          { id: 6, label: item.lectureHours || 'К-ть аудиторних годин відсутня' },
          { id: 7, label: item.isExam ? 'Іспит' : 'Залік' },
          { id: 8, label: item.type || 'Тип відсутній' },
          {
            id: 9,
            label: <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />,
          },
        ],
        key: item.id,
      })));
      setIsLoading(false);
    }
  }, [getCourses?.data]);

  return (
    <Layout>
      <TitlePage
        title="Предмети"
        {...isPhone && ({ setIsActiveModal })}
        {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
        action={(
          <Button
            nameClass="primary"
            className={pagesStyle.buttonsCreate}
            size="large"
            onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
          >
            Створити
          </Button>
              )}
      />
      {isLoading ? <Preloader /> : (
        <>
          <Table
            filter={(
              <CoursesFilters
                courseId={courseId}
                groupId={groupId}
                teacherId={teacherId}
                courseType={courseType}
              />
          )}
            dataHeader={dataHeader}
            dataRow={dataRow}
            gridColumns={styles.columns}
            totalItems={pagination.totalItems}
          />

          <PhoneFilter modalTitle="Фільтрація предметів" isActive={!!isActiveModal.filter} closeModal={closeModal}>
            <CoursesFilters courseId={courseId} groupId={groupId} teacherId={teacherId} courseType={courseType} />
          </PhoneFilter>

          <CourseCreateModal
            modalActive={!!isActiveModal.create}
            closeModal={closeModal}
          />
          <CourseEditModal
            modalActive={!!isActiveModal.edit}
            studentId={+isActiveModal.edit}
            closeModal={closeModal}
          />
          <CourseDeleteModal
            modalActive={!!isActiveModal.delete}
            Id={+isActiveModal.delete}
            closeModal={closeModal}
          />
        </>
      )}
    </Layout>
  );
};

export default Courses;

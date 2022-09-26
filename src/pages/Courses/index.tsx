import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import pagesStyle from '../pagesStyle.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';
import { useCourseContext } from '../../context/courses';
import { IGetCoursesData, IGetCoursesParams } from '../../hooks/useCourses';
import SelectCourse from '../../components/common/Select/SelectCourse';
import SelectTeacher from '../../components/common/Select/SelectTeacher';
import CourseCreateModal from './modal/CourseCreate';
import CourseEditModal from './modal/CourseEdit';
import CourseDeleteModal from './modal/CourseDelete';
import SelectCompulsory from '../../components/common/Select/SelectCompulsory';
import SelectGroupById from '../../components/common/Select/SelectGroupById';
import { useDeviceContext } from '../../context/TypeDevice';
import { useQueryParam } from '../../hooks/useUrlParams';
import { EditAndDelete } from '../../components/common/GroupButtons';
import CoursesFilters from './components/CoursesFilters';
import DesktopTable from '../../components/common/table/DesktopTable';
import AdministratorsFilters from '../Administrators/Components/AdministratorsFilters';
import TableFilter from '../../components/common/table/TableFilter';
import MobileElementListAdministrators from '../Administrators/Components/MobileElementListAdministrators';
import PhoneFilter from '../../components/common/PhoneFilter';
import MobileElementListCourses from './components/MobileElementListCourses';

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
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });
  const [data, setData] = useState<IGetCoursesData[]>();

  const { getCourses, courseDelete, courseEdit, courseCreate } = useCourseContext();
  const { isPhone, isDesktop, isTablet } = useDeviceContext();
  const { get } = useQueryParam();

  const courseId = Number(get('courseId'));
  const groupId = Number(get('groupId'));
  const teacherId = Number(get('teacherId'));
  const isCompulsory = String(get('isCompulsory'));
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    const query: IGetCoursesParams = {};

    if (courseId) query.id = courseId;
    if (groupId) query.groups = groupId;
    if (teacherId) query.teacher = teacherId;
    if (isCompulsory === 'true' || isCompulsory === 'false') query.isCompulsory = isCompulsory === 'true';
    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    getCourses?.getCourses(query);
  }, [courseId, groupId, teacherId, isCompulsory, currentPage,
    itemsPerPage, courseCreate?.data, courseEdit?.data, courseDelete?.data]);

  useEffect(() => {
    if (getCourses?.data) {
      setPagination(getCourses.data.meta);
      setData(getCourses.data.items);
      setDataRow(getCourses?.data?.items.map((item: IGetCoursesData) => ({
        list: [
          { id: 1, label: item.name },
          {
            id: 2,
            label: `${item?.teacher?.lastName || ''}
            ${item?.teacher?.firstName || ''}
            ${item?.teacher?.patronymic || ''}`,
          },
          { id: 3, label: item.semester === 1 ? 'I' : 'II' },
          { id: 4, label: `${item.credits}` },
          { id: 5, label: item.groups.map((group) => group.name).join(',') },
          { id: 6, label: `${item.lectureHours}` },
          { id: 7, label: item.isExam ? 'Іспит' : 'Залік' },
          { id: 8, label: item.isCompulsory ? "Обов'язковий" : "Не обов'язковий" },
          {
            id: 9,
            label: <EditAndDelete isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />,
          },
        ],
        key: item.id,
      })));
    }
  }, [getCourses?.data]);

  return (
    <Layout>
      <div>
        {isDesktop && (
          <>
            <TitlePage
              title="Предмети"
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
            <DesktopTable
              filter={(
                <CoursesFilters
                  courseId={courseId}
                  groupId={groupId}
                  teacherId={teacherId}
                  isCompulsory={isCompulsory}
                />
)}
              dataHeader={dataHeader}
              dataRow={dataRow}
              className={styles.columns}
              totalItems={pagination.totalItems}
            />
          </>
        )}
        {(isTablet || isPhone) && (
          <>
            <TitlePage
              title="Предмети"
              {...isPhone && ({ setIsActiveModal })}
              {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
              action={(
                <Button
                  nameClass="primary"
                  className={pagesStyle.buttonsCreate}
                  size="large"
                  onClick={() => setIsActiveModal({ create: true })}
                >
                  Створити
                </Button>
              )}
            />
            {isTablet && (
              <TableFilter filter={(
                <CoursesFilters
                  courseId={courseId}
                  groupId={groupId}
                  teacherId={teacherId}
                  isCompulsory={isCompulsory}
                />
                )}
              />
            )}
            <MobileElementListCourses
              data={data}
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
            />
          </>
        )}

        <PhoneFilter isActive={!!isActiveModal.filter} closeModal={closeModal}>
          <CoursesFilters courseId={courseId} groupId={groupId} teacherId={teacherId} isCompulsory={isCompulsory} />
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
      </div>
    </Layout>
  );
};

Courses.defaultProps = {
  filter: '',
};

export default Courses;

import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';
import { TeacherRatingEdit } from './RatingEdit';
import TeacherRatingHistory from './RatingHistory';
import { useTeacherPageContext } from '../../context/pageTeacher';
import { IGetPageTeacherData, IGetPageTeacherParams } from '../../hooks/usePageTeacher';
import { useEstimatesContext } from '../../context/estimates';
import { useDeviceContext } from '../../context/TypeDevice';
import DesktopTable from '../../components/common/table/DesktopTable';
import MobileElementListTeacherPage from './components/MobileElementListTeacherPage';
import FilterTeacherPage from './components/FilterTeacherPage';
import TableFilter from '../../components/common/table/TableFilter';
import { EditAndHistory } from '../../components/common/GroupButtons';
import PhoneFilter from '../../components/common/PhoneFilter';
import { useQueryParam } from '../../hooks/useUrlParams';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Предмет' },
  { id: 4, label: 'Оцінка' },
  { id: 5, label: 'Дії' },
];

const TeacherPageModalState: Record<string, number | boolean> = {
  edit: 0,
  history: 0,
  filter: false,
};

const TeacherPage = (): JSX.Element => {
  const [isActiveModal, setIsActiveModal] = useState<Record<string, number | boolean>>(TeacherPageModalState);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [formData, setFormData] = useState<IGetPageTeacherData[]>();
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });
  const [data, setData] = useState<IGetPageTeacherData[]>();

  const { teacherDataGet, teacherEditRating } = useTeacherPageContext();
  const { gradesEdit } = useEstimatesContext();
  const { isDesktop, isTablet, isPhone } = useDeviceContext();
  const { get } = useQueryParam();

  const groupId = Number(get('groupId'));
  const studentId = Number(get('studentId'));
  const courseId = Number(get('courseId'));
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(TeacherPageModalState);
  };

  useEffect(() => {
    const query: IGetPageTeacherParams = {};

    if (studentId) query.studentId = studentId;
    if (groupId) query.groupId = groupId;
    if (courseId) query.courseId = courseId;

    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    teacherDataGet?.pageTeacherGet(query);
  }, [teacherEditRating?.data,
    gradesEdit?.data, groupId,
    studentId,
    courseId,
    currentPage,
    itemsPerPage,
  ]);

  useEffect(() => {
    if (teacherDataGet?.data) {
      setPagination(teacherDataGet.data.meta);
      setData(teacherDataGet.data.items);
      setDataRow(teacherDataGet?.data?.items.map((item: IGetPageTeacherData) => ({
        list: [
          {
            id: 1,
            label:
              `${item.student.user.lastName}
              ${item.student.user.firstName}
              ${item.student.user.patronymic}`,
          },
          { id: 2, label: item.student.group.name },
          { id: 3, label: item.course.name },
          { id: 4, label: item.grade },
          {
            id: 5,
            label: (
              <EditAndHistory isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />
            ),
          },
        ],
        key: item.id,
      })));
      setFormData(teacherDataGet.data.items);
    }
  }, [teacherDataGet?.data]);

  return (
    <Layout>
      <div>
        {isDesktop && (
          <>
            <TitlePage title="Студенти" action={undefined} />
            <DesktopTable
              filter={(<FilterTeacherPage studentId={studentId} groupId={groupId} courseId={courseId} />)}
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
              title="Студенти"
              {...isPhone && ({ setIsActiveModal })}
              {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
              action={undefined}
            />
            {isTablet && (
              <TableFilter filter={(
                <FilterTeacherPage
                  studentId={studentId}
                  groupId={groupId}
                  courseId={courseId}
                />
              )}
              />
            )}
            <MobileElementListTeacherPage
              data={data}
              isActiveModal={isActiveModal}
              setIsActiveModal={setIsActiveModal}
            />
          </>
        )}
        <PhoneFilter isActive={!!isActiveModal.filter} closeModal={closeModal}>
          <FilterTeacherPage studentId={studentId} groupId={groupId} courseId={courseId} />
        </PhoneFilter>
        <TeacherRatingEdit
          modalActive={!!isActiveModal.edit}
          studentId={isActiveModal.edit as number}
          closeModal={closeModal}
        />
        <TeacherRatingHistory
          modalActive={!!isActiveModal.history}
          Id={isActiveModal.history as number}
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

import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/common/TitlePage';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { initialPagination, Pagination } from '../../types';
import { TeacherRatingEdit } from './modal/RatingEdit';
import TeacherRatingHistory from './modal/RatingHistory';
import { TeacherContext } from '../../context/PageInTeacher/Teacher';
import { IGetPageTeacherData, IGetPageTeacherParams } from '../../hooks/PageInTeacher/useTeacher';
import { EstimatesContext } from '../../context/PagesInAdmin/Estimates';
import { DeviceContext } from '../../context/All/DeviceType';
import TeacherFilters from './Filters';
import { EditAndHistory } from '../../components/common/CollectionMiniButtons';
import PhoneFilter from '../../components/common/PhoneFilter';
import { useQueryParam } from '../../hooks/All/useQueryParams';
import Table from '../../components/common/Table';

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
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });

  const { teacherDataGet, teacherEditRating } = TeacherContext();
  const { gradesEdit } = EstimatesContext();
  const { isPhone } = DeviceContext();
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
    }
  }, [teacherDataGet?.data]);

  return (
    <Layout>
      <div>
        <TitlePage
          title="Студенти"
          {...isPhone && ({ setIsActiveModal })}
          {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
        />
        <Table
          filter={(<TeacherFilters studentId={studentId} groupId={groupId} courseId={courseId} />)}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          totalItems={pagination.totalItems}
        />
        <PhoneFilter modalTitle="Фільтрація студентів" isActive={!!isActiveModal.filter} closeModal={closeModal}>
          <TeacherFilters studentId={studentId} groupId={groupId} courseId={courseId} />
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

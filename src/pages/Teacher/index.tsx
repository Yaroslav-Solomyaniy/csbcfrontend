import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
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
import { Edit, History } from '../../components/common/Icon';
import { useEstimatesContext } from '../../context/estimates';
import { useDeviceContext } from '../../context/TypeDevice';
import PageFilter from './components/PageFilter';
import TableFilter from '../../components/common/table/TableFilter';
import { IGroupCreateParams } from '../../hooks/useGroups';
import ControlButtons from './components/ControlButtons';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Група' },
  { id: 3, label: 'Предмет' },
  { id: 4, label: 'Оцінка' },
  { id: 5, label: 'Дії' },
];

export interface IIsActiveModalState {
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

export interface IParams {
  filter: Filter;
  pagination: Pagination;
}

const TeacherPage = (): JSX.Element => {
  const { teacherDataGet, teacherEditRating } = useTeacherPageContext();
  const { gradesEdit } = useEstimatesContext();
  const { isDesktop, isNotebook } = useDeviceContext();

  const [params, setParams] = useState<IParams>({
    filter: { student: '', group: '', course: '' },
    pagination: initialPagination,
  });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [formData, setFormData] = useState<IGetPageTeacherData[]>();

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
    teacherEditRating?.data,
    gradesEdit?.data,
    params.filter.course,
    params.filter.student,
    params.pagination.currentPage,
    params.pagination.itemsPerPage]);

  useEffect(() => {
    if (teacherDataGet?.data) {
      setParams({ ...params, pagination: teacherDataGet.data.meta });
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
              <ControlButtons isActiveModal={isActiveModal} setIsActiveModal={setIsActiveModal} itemId={item.id} />
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
      <div className={clsx(
        isDesktop || isNotebook && (!!isActiveModal.edit || !!isActiveModal.history)
          ? styles.noContent
          : (isDesktop || isNotebook) && styles.content,
      )}
      >
        {/* {isDesktop || isNotebook <TitlePage title="Студенти" /> : } */}
        {isDesktop && (
          <Table
            filter={(
              <PageFilter value={params} setParams={setParams} />
            )}
            dataHeader={dataHeader}
            dataRow={dataRow}
            gridColumns={styles.columns}
            pagination={params.pagination}
            onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
          />
        )}
        {isNotebook && (
          !!isActiveModal.edit || !!isActiveModal.history
            ? (
              <>

              </>
            )
            : (
              <>
                <TableFilter filter={<PageFilter value={params} setParams={setParams} />} />
                {formData?.map((item) => (
                  <div key={item.id} className={styles.notebookItem}>
                    <div className={styles.notebookItem_Content}>
                      <h1 className={styles.notebookItem_Content__Title}>
                        {`${item.student.user.lastName}
                       ${item.student.user.firstName}
                       ${item.student.user.patronymic},
                       ${item.student.group.name}`}
                      </h1>
                      <h6 className={styles.notebookItem_Content__subTitle}>
                        Предмет:
                        {item.course.name}
                      </h6>
                      <h6 className={styles.notebookItem_Content__subTitle}>
                        Оцінка:
                        {item.grade}
                      </h6>
                    </div>
                    <div className={styles.notebookItem_buttons}>
                      <ControlButtons
                        isActiveModal={isActiveModal}
                        setIsActiveModal={setIsActiveModal}
                        itemId={item.id}
                      />
                    </div>
                  </div>
                ))}
              </>
            ))}
      </div>
      <TeacherRatingEdit
        modalActive={!!isActiveModal.edit}
        studentId={isActiveModal.edit}
        closeModal={closeModal}
      />
      <TeacherRatingHistory
        modalActive={!!isActiveModal.history}
        Id={isActiveModal.history}
        closeModal={closeModal}
      />
    </Layout>
  );
};

TeacherPage.defaultProps = {
  filter: '',
};

export default TeacherPage;

import React, { useEffect, useState } from 'react';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { initialPagination, Pagination } from '../../types';
import { ITableRowItem } from '../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { useGetListCourses } from '../../hooks/All/useDropDowns';
import { DeviceContext } from '../../context/All/DeviceType';
import { useQueryParam } from '../../hooks/All/useQueryParams';
import { IGetGradesParams } from '../../hooks/PagesInAdmin/useEstimates';
import styles from '../Admin/Estimates/index.module.scss';
import TitlePage from '../../components/common/TitlePage';
import Table from '../../components/common/Table';
import EstimatesFilters from '../Admin/Estimates/Filters';
import PhoneFilter from '../../components/common/PhoneFilter';
import EstimatesHistory from '../Admin/Estimates/modal/EstimatesHystory';
import CuratorFilters from './Filters';
import { AuthContext } from '../../context/All/AuthContext';
import { CuratorContext } from '../../context/PageInCurator';
import { EstimatesContext } from '../../context/PagesInAdmin/Estimates';
import { ListicHistoryDownload } from '../../components/common/CollectionMiniButtons';
import { IGetCuratorData } from '../../hooks/PageInCurator/CuratorPage';
import StudentInfo from './modal/StudentInfo';

const allCloseModalWindow: Record<string, boolean | number> = {
  filter: false,
  history: 0,
  info: 0,
};

const Curator = (): JSX.Element => {
  const [isActiveModal, setIsActiveModal] = useState<Record<string, boolean | number>>(allCloseModalWindow);
  const [dataHeader, setDataHeader] = useState<ITableHeader[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const { user } = AuthContext();
  const { curatorGet } = CuratorContext();
  const { gradesEdit } = EstimatesContext();

  const { isPhone } = DeviceContext();
  const courses = useGetListCourses();

  const { get } = useQueryParam();

  const groupId = Number(get('groupId'));
  const semesterId = Number(get('semesterId'));
  const studentId = Number(get('studentId'));
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    courses.getListCourses({ curatorId: user?.id });
  }, [curatorGet?.data]);

  useEffect(() => {
    const query: IGetGradesParams = {};

    if (groupId) query.groupId = groupId;
    if (semesterId) query.studentId = semesterId;
    if (studentId) query.studentId = studentId;
    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    curatorGet?.getCuratorPage(query);
  }, [
    gradesEdit?.data,
    groupId,
    semesterId,
    studentId,
    currentPage,
    itemsPerPage,
  ]);

  useEffect(() => {
    let id = 3;

    setDataHeader([
      { id: 1, label: 'ПІБ' },
      { id: 2, label: 'Група' },
      { id: 3, label: 'Середній бал' },
      ...courses.optionCourses ? courses.optionCourses.items.map(
        (el) => ({ id: ++id, label: el.name }),
      ) : [],
      { id: ++id, label: 'Дії' },
    ]);

    if (curatorGet?.data) {
      setPagination(curatorGet.data.meta);
      setDataRow(tableRows(curatorGet.data.items));
    }
  }, [curatorGet?.data, courses.optionCourses, isActiveModal]);

  const tableRows = (arrTableRows: IGetCuratorData[]) => {
    let id = 3;

    return (
      arrTableRows.length ? arrTableRows.map((student: IGetCuratorData) => {
        const arrTableRowsGrade = courses.optionCourses
          ? courses.optionCourses.items.map((course) => {
            const studentGrades = student.grades.find(
              (studentGrade) => studentGrade.course.id === course.id,
            );

            return ({
              id: ++id,
              label: studentGrades ? `${studentGrades.grade}` : '',
            });
          }) : [];

        return ({
          list: [
            { id: 1, label: `${student.user.lastName} ${student.user.firstName} ${student.user.patronymic} ` },
            { id: 2, label: student.group.name },
            {
              id: 3,
              label: student.grades.length
                ? (student.grades
                  .reduce((sum, elem) => sum + elem.grade, 0) / student.grades.length)
                  .toFixed(1)
                : 0,
            },
            ...arrTableRowsGrade,
            {
              id: ++id,
              label: (
                <ListicHistoryDownload
                  isActiveModal={isActiveModal}
                  setIsActiveModal={setIsActiveModal}
                  itemId={student.id}
                />
              ),
            },
          ],
          key: student.id,
        });
      }) : []
    );
  };

  return (
    <Layout>
      <div className={styles.grades}>
        <TitlePage
          title="Оцінки студентів"
          {...isPhone && ({ setIsActiveModal })}
          {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
        />
        <Table
          filter={(<EstimatesFilters studentId={studentId} semesterId={semesterId} groupId={groupId} />)}
          columScrollHorizontal={courses.optionCourses ? +`${courses.optionCourses?.items.length}` : 0}
          isScroll
          isTwoColumns
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          totalItems={pagination.totalItems}
        />

        <PhoneFilter modalTitle="Фільтрація" isActive={!!isActiveModal.filter} closeModal={closeModal}>
          <CuratorFilters studentId={studentId} groupId={groupId} />
        </PhoneFilter>

        <StudentInfo
          modalActive={!!isActiveModal.info}
          studentId={+isActiveModal.info}
          closeModal={closeModal}
        />

        <EstimatesHistory
          modalActive={!!isActiveModal.history}
          closeModal={closeModal}
          studentId={+isActiveModal.history}
          semester={+isActiveModal.semester}
        />
      </div>
    </Layout>
  );
};

export default Curator;

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
import EstimatesEdit from '../Admin/Estimates/modal/EstimatesEdit';
import EstimatesHistory from '../Admin/Estimates/modal/EstimatesHystory';
import CuratorFilters from './Filters';
import { AuthContext } from '../../context/All/AuthContext';
import { CuratorContext } from '../../context/PageInCurator';
import { EstimatesContext } from '../../context/PagesInAdmin/Estimates';

const allCloseModalWindow: Record<string, boolean | number> = {
  studentInfo: 0,
  filter: false,
  history: 0,

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
    // if (semesterId) query.studentId = semesterId;
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

  // useEffect(() => {
  //   let id = 3;
  //
  //   setDataHeader([
  //     { id: 1, label: 'ПІБ' },
  //     { id: 2, label: 'Група' },
  //     { id: 3, label: 'Середній бал' },
  //     ...courses.optionCourses ? courses.optionCourses.items.map(
  //       (el) => ({ id: ++id, label: el.name }),
  //     ) : [],
  //     { id: ++id, label: 'Дії' },
  //   ]);
  //
  //   if (curatorGet?.data) {
  //     setPagination(curatorGet.data.meta);
  //     setDataRow(tableRows(curatorGet.data.items));
  //   }
  // }, [curatorGet?.data, courses.optionCourses, isActiveModal]);
  //
  // const tableRows = (arrTableRows: IGetGradesData[]) => {
  //   let id = 3;
  //
  //   return (
  //     arrTableRows.length ? arrTableRows.map((student: IGetGradesData) => {
  //       const arrTableRowsGrade = courses.optionCourses
  //         ? courses.optionCourses.items.map((course) => {
  //           const studentGrades = student.grades.find(
  //             (studentGrade) => studentGrade.course.id === course.id,
  //           );
  //
  //           return ({
  //             id: ++id,
  //             label: studentGrades ? (
  //               <div
  //                 className={clsx(
  //                   isDesktop ? styles.gradesCell : styles.gradesMobile,
  //                   !!(isActiveModal.gradeEdit === studentGrades.id && isDesktop) && styles.gradesCell__active,
  //                   (isActiveModal.gradeEdit === studentGrades.id && !(isDesktop)) && styles.gradesMobile__active,
  //                 )}
  //                 onClick={() => setIsActiveModal(
  //                   {
  //                     ...isActiveModal,
  //                     gradeEdit: isActiveModal.gradeEdit === studentGrades.id ? 0 : studentGrades.id,
  //                   },
  //                 )}
  //               >
  //                 {`${studentGrades.grade}`}
  //               </div>
  //             ) : '',
  //           });
  //         })
  //         : [];
  //
  //       return ({
  //         list: [
  //           { id: 1, label: `${student.user.lastName} ${student.user.firstName} ${student.user.patronymic} ` },
  //           { id: 2, label: student.group.name },
  //           {
  //             id: 3,
  //             label: Math.ceil(student.grades.reduce((sum, elem) => sum + elem.grade, 0) / student.grades.length),
  //           },
  //           ...arrTableRowsGrade,
  //           {
  //             id: ++id,
  //             label: (
  //               <EditHistoryDownload
  //                 isActiveModal={isActiveModal}
  //                 setIsActiveModal={setIsActiveModal}
  //                 itemId={student.id}
  //               />
  //             ),
  //           },
  //         ],
  //         key: student.id,
  //       });
  //     }) : []
  //   );
  // };

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

        <EstimatesEdit
          modalActive={!!isActiveModal.edit}
          closeModal={closeModal}
          studentId={+isActiveModal.edit}
          gradeId={+isActiveModal.gradeEdit}
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

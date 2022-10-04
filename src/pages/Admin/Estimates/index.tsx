import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import styles from './index.module.scss';
import TitlePage from '../../../components/common/TitlePage';
import Table from '../../../components/common/Table';
import { useGetListCourses } from '../../../hooks/All/useDropDowns';
import { EstimatesContext } from '../../../context/PagesInAdmin/Estimates';
import { IGetGradesData, IGetGradesParams } from '../../../hooks/PagesInAdmin/useEstimates';
import EstimatesEdit from './modal/EstimatesEdit';
import EstimatesFilters from './Filters';
import PhoneFilter from '../../../components/common/PhoneFilter';
import { useQueryParam } from '../../../hooks/All/useQueryParams';
import { initialPagination, Pagination } from '../../../types';
import { DeviceContext } from '../../../context/All/DeviceType';
import EstimatesHistory from './modal/EstimatesHystory';
import { EditHistoryDownload } from '../../../components/common/CollectionMiniButtons';

const allCloseModalWindow: Record<string, boolean | number | string> = {
  openHistory: false,
  studentEdit: 0,
  gradeEdit: 0,
  history: 0,
  download: 0,
  semester: '',
  filter: false,
};

const Estimates = (): JSX.Element => {
  const [isActiveModal, setIsActiveModal] = useState<Record<string, boolean | string | number>>(allCloseModalWindow);
  const [dataHeader, setDataHeader] = useState<ITableHeader[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ ...initialPagination });
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const { gradesGet, gradesEdit } = EstimatesContext();
  const dropCurses = useGetListCourses();

  const { isPhone, isDesktop } = DeviceContext();

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
    dropCurses.getListCourses();
  }, [gradesGet?.data]);

  useEffect(() => {
    const query: IGetGradesParams = {};

    if (groupId) query.groupId = groupId;
    // if (semesterId) query.studentId = semesterId;
    if (studentId) query.studentId = studentId;
    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    gradesGet?.getEstimateStudent(query);
  }, [
    gradesEdit?.data,
    groupId,
    semesterId,
    studentId,
    currentPage,
    itemsPerPage,
  ]);

  const tableRows = (arrTableRows: IGetGradesData[]) => {
    let id = 3;

    return (
      arrTableRows.length ? arrTableRows.map((student: IGetGradesData) => {
        const arrTableRowsGrade = dropCurses.optionCourses
          ? dropCurses.optionCourses.items.map((course) => {
            const studentGrades = student.grades.find(
              (studentGrade) => studentGrade.course.id === course.id,
            );

            return ({
              id: ++id,
              label: studentGrades ? (
                <div
                  className={clsx(
                    isDesktop ? styles.gradesCell : styles.gradesMobile,
                    !!(isActiveModal.gradeEdit === studentGrades.id && isDesktop) && styles.gradesCell__active,
                    (isActiveModal.gradeEdit === studentGrades.id && !(isDesktop)) && styles.gradesMobile__active,
                  )}
                  onClick={() => setIsActiveModal(
                    {
                      ...isActiveModal,
                      gradeEdit: isActiveModal.gradeEdit === studentGrades.id ? 0 : studentGrades.id,
                    },
                  )}
                >
                  {`${studentGrades.grade}`}
                </div>
              ) : '',
            });
          })
          : [];

        return ({
          list: [
            { id: 1, label: `${student.user.lastName} ${student.user.firstName} ${student.user.patronymic} ` },
            { id: 2, label: student.group.name },
            {
              id: 3,
              label: Math.ceil(student.grades.reduce((sum, elem) => sum + elem.grade, 0) / student.grades.length),
            },
            ...arrTableRowsGrade,
            {
              id: ++id,
              label: (
                <EditHistoryDownload
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

  useEffect(() => {
    let id = 3;

    setDataHeader([
      { id: 1, label: 'ПІБ' },
      { id: 2, label: 'Група' },
      { id: 3, label: 'Середній бал' },
      ...dropCurses.optionCourses ? dropCurses.optionCourses.items.map(
        (el) => ({ id: ++id, label: el.name }),
      ) : [],
      { id: ++id, label: 'Дії' },
    ]);

    if (gradesGet?.data) {
      setPagination(gradesGet.data.meta);
      setDataRow(tableRows(gradesGet.data.items));
    }
  }, [gradesGet?.data, dropCurses.optionCourses, isActiveModal]);

  return (
    <Layout>
      <div className={styles.grades}>

        <TitlePage
          title="Оцінки"
          {...isPhone && ({ setIsActiveModal })}
          {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
        />
        <Table
          filter={(<EstimatesFilters studentId={studentId} semesterId={semesterId} groupId={groupId} />)}
          columScrollHorizontal={dropCurses.optionCourses ? +`${dropCurses.optionCourses?.items.length}` : 0}
          isScroll
          isTwoColumns
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          totalItems={pagination.totalItems}
        />

        <PhoneFilter modalTitle="Фільтрація предметів" isActive={!!isActiveModal.filter} closeModal={closeModal}>
          <EstimatesFilters studentId={studentId} semesterId={semesterId} groupId={groupId} />
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
          semester={isActiveModal.semester.toString()}
        />
      </div>
    </Layout>
  );
};

export default Estimates;

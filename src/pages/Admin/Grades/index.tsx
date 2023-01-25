import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import styles from './index.module.scss';
import TitlePage from '../../../components/common/TitlePage';
import Table from '../../../components/common/Table';
import { useGetListCourses } from '../../../hooks/api/all/useDropDowns';
import { EstimatesContext } from '../../../context/Pages/admin/Estimates';
import EstimatesEdit from './modal/EstimatesEdit';
import EstimatesFilters from './Filters';
import PhoneFilter from '../../../components/common/PhoneFilter';
import { AddQueryParams, useQueryParam } from '../../../hooks/hooks/useQueryParams';
import { initialPagination, IPagination } from '../../../types';
import { DeviceContext } from '../../../context/All/DeviceType';
import EstimatesHistory from './modal/EstimatesHystory';
import { TablesActions } from '../../../components/common/CollectionMiniButtons';
import Preloader from '../../../components/common/Preloader/Preloader';
import Button from '../../../components/common/Button';
import { Download, Edit, History } from '../../../components/common/Icons';
import { useDownloadFile } from '../../../hooks/hooks/useDownloadFile';
import { useDownloadGrades } from '../../../hooks/api/admin/grades/useDownload';
import { useGetStudentById } from '../../../hooks/api/admin/students/useGetById';
import useChangePage from '../../../hooks/hooks/useCheckPage';
import { IGetGradesData } from '../../../hooks/api/admin/grades/interfaces/IGetGradesData';

const allCloseModalWindow: Record<string, boolean | number | string> = {
  openHistory: false,
  studentEdit: 0,
  gradeEdit: 0,
  history: 0,
  download: 0,
  semester: '',
  edit: false,
  filter: false,
};

const Estimates = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveModal, setIsActiveModal] = useState<Record<string, boolean | string | number>>(allCloseModalWindow);
  const [dataHeader, setDataHeader] = useState<ITableHeader[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ ...initialPagination });
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const { getGrades, editGrade } = EstimatesContext();
  const dropCurses = useGetListCourses();

  const { isPhone, isDesktop } = DeviceContext();

  const { get } = useQueryParam();

  const groupId = Number(get('groupId'));
  const semesterId = Number(get('semesterId')) || undefined;
  const studentId = Number(get('studentId'));
  const currentPage = Number(get('currentPage')) || 1;
  const itemsPerPage = Number(get('itemsPerPage')) || 10;
  const { download, dataFile } = useDownloadGrades();
  const { getStudentById, data } = useGetStudentById();

  useChangePage({ pagination, currentPage });

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    dropCurses.getListCourses({ semester: semesterId });
  }, [getGrades?.data, semesterId]);

  useEffect(() => {
    getGrades?.getGrades(
      AddQueryParams({ groupId, semester: semesterId, studentId, page: currentPage, limit: itemsPerPage }),
    );
  }, [editGrade?.data, groupId, semesterId, studentId, currentPage, itemsPerPage]);

  const downloadGrades = (id: number) => {
    getStudentById({ id });
    download({ id });
  };

  useEffect(() => {
    if (data && dataFile) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDownloadFile(dataFile, data.user
        // eslint-disable-next-line max-len
        ? `Оцінки - ${data.user.lastName} ${data.user.firstName[0].toUpperCase()}.${data.user.patronymic[0].toUpperCase()}.`
        : 'User');
    }
  }, [data, dataFile]);

  const tableRows = (arrTableRows: IGetGradesData[]) => {
    let id = 3;

    return (
      arrTableRows.length ? arrTableRows.map((student: IGetGradesData) => {
        const arrTableRowsGrade = dropCurses.optionCourses
          ? dropCurses.optionCourses.map((course) => {
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
                      studentEdit: student.id,
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
                <TablesActions>
                  <Button
                    disabled={student.id !== isActiveModal.studentEdit}
                    onClick={() => setIsActiveModal(
                      { ...isActiveModal, edit: !!isActiveModal.gradeEdit },
                    )}
                    isImg
                  >
                    <Edit />
                  </Button>
                  <Button
                    onClick={() => setIsActiveModal({ ...isActiveModal, history: student.id })}
                    isImg
                  >
                    <History />
                  </Button>
                  <Button
                    onClick={() => downloadGrades(student.id)}
                    isImg
                  >
                    <Download />
                  </Button>
                </TablesActions>
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
      ...dropCurses.optionCourses ? dropCurses.optionCourses.map(
        (el) => ({ id: ++id, label: el.name }),
      ) : [],
      { id: ++id, label: 'Дії' },
    ]);

    if (getGrades?.data) {
      setPagination(getGrades.data.meta);
      setDataRow(tableRows(getGrades.data.items));
      setIsLoading(false);
    }
  }, [getGrades?.data, dropCurses.optionCourses, isActiveModal]);

  return (
    <Layout>
      <TitlePage
        title="Оцінки"
        {...isPhone && !!(dropCurses.optionCourses?.length) && ({ setIsActiveModal })}
        {...isPhone && !!(dropCurses.optionCourses?.length) && ({ isActiveModal: !!isActiveModal.filter })}
      />
      {isLoading ? <Preloader /> : (
        <>
          {(dropCurses?.optionCourses?.length || 0) > 0 ? (
            <>
              <Table
                filter={(<EstimatesFilters studentId={studentId} semesterId={semesterId} groupId={groupId} />)}
                columScrollHorizontal={dropCurses.optionCourses ? +`${dropCurses.optionCourses?.length}` : 0}
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
            </>
          ) : (
            <h1 className={styles.titleNullCourses}>Додайте предмети для відображення оцінок</h1>
          )}
          <EstimatesEdit
            modalActive={!!isActiveModal.edit}
            closeModal={closeModal}
            studentId={+isActiveModal.studentEdit}
            gradeId={+isActiveModal.gradeEdit}
          />
          <EstimatesHistory
            modalActive={!!isActiveModal.history}
            closeModal={closeModal}
            studentId={+isActiveModal.history}
            semester={semesterId}
          />
        </>
      )}
    </Layout>
  );
};

export default Estimates;

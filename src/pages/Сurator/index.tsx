import React, { useEffect, useState } from 'react';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { initialPagination, IPagination } from '../../types';
import { ITableRowItem } from '../../components/common/Table/TypeDisplay/Desktop/TableBody';
import { useGetListCourses } from '../../hooks/api/all/useDropDowns';
import { DeviceContext } from '../../context/All/DeviceType';
import { useQueryParam } from '../../hooks/hooks/useQueryParams';
import styles from '../Admin/Grades/index.module.scss';
import TitlePage from '../../components/common/TitlePage';
import Table from '../../components/common/Table';
import EstimatesFilters from '../Admin/Grades/Filters';
import PhoneFilter from '../../components/common/PhoneFilter';
import EstimatesHistory from '../Admin/Grades/modal/EstimatesHystory';
import CuratorFilters from './Filters';
import { AuthContext } from '../../context/All/AuthContext';
import { CuratorContext } from '../../context/Pages/curator';
import { EstimatesContext } from '../../context/Pages/admin/Estimates';
import { TablesActions } from '../../components/common/CollectionMiniButtons';
import { IGetCuratorData } from '../../hooks/api/curator/useGetCurator';
import StudentInfo from './modal/StudentInfo';
import Preloader from '../../components/common/Preloader/Preloader';
import Button from '../../components/common/Button';
import { Download, History, Listic } from '../../components/common/Icons';
import { useDownloadFile } from '../../hooks/hooks/useDownloadFile';
import { IGetGradesParams } from '../../hooks/api/admin/grades/useGet';
import { useDownloadGrades } from '../../hooks/api/admin/grades/useDownload';
import { useGetStudentById } from '../../hooks/api/admin/students/useGetById';

const allCloseModalWindow: Record<string, boolean | number> = {
  filter: false,
  history: 0,
  info: 0,
};

const Curator = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveModal, setIsActiveModal] = useState<Record<string, boolean | number>>(allCloseModalWindow);
  const [dataHeader, setDataHeader] = useState<ITableHeader[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ ...initialPagination });
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const { download, dataFile } = useDownloadGrades();
  const { getStudentById, data } = useGetStudentById();

  const { user } = AuthContext();
  const { getCurator } = CuratorContext();
  const { editGrade } = EstimatesContext();

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
  }, [getCurator?.data]);

  useEffect(() => {
    const query: IGetGradesParams = {};

    if (groupId) query.groupId = groupId;
    if (semesterId) query.studentId = semesterId;
    if (studentId) query.studentId = studentId;
    if (currentPage) query.page = currentPage;
    if (itemsPerPage) query.limit = itemsPerPage;

    getCurator?.getCurator(query);
  }, [
    editGrade?.data,
    groupId,
    semesterId,
    studentId,
    currentPage,
    itemsPerPage,
  ]);

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

  useEffect(() => {
    let id = 3;

    setDataHeader([
      { id: 1, label: 'ПІБ' },
      { id: 2, label: 'Група' },
      { id: 3, label: 'Середній бал' },
      ...courses.optionCourses ? courses.optionCourses.map(
        (el) => ({ id: ++id, label: el.name }),
      ) : [],
      { id: ++id, label: 'Дії' },
    ]);

    if (getCurator?.data) {
      setPagination(getCurator.data.meta);
      setDataRow(tableRows(getCurator.data.items));
    }
  }, [getCurator?.data, courses.optionCourses, isActiveModal]);

  const tableRows = (arrTableRows: IGetCuratorData[]) => {
    let id = 3;

    return (
      arrTableRows.length ? arrTableRows.map((student: IGetCuratorData) => {
        const arrTableRowsGrade = courses.optionCourses
          ? courses.optionCourses.map((course) => {
            const studentGrades = student.grades.find(
              (studentGrade) => studentGrade.course.id === course.id,
            );

            return ({
              id: ++id,
              label: studentGrades ? `${studentGrades.grade}` : '',
            });
          }) : [];

        setIsLoading(false);

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
                    onClick={() => setIsActiveModal(
                      { ...isActiveModal, info: student.id },
                    )}
                    isImg
                  >
                    <Listic />
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

  return (
    <Layout>
      <TitlePage
        title="Оцінки студентів"
        {...isPhone && ({ setIsActiveModal })}
        {...isPhone && ({ isActiveModal: !!isActiveModal.filter })}
      />
      {isLoading ? <Preloader /> : (
        <>
          <Table
            filter={(<EstimatesFilters studentId={studentId} semesterId={semesterId} groupId={groupId} />)}
            columScrollHorizontal={courses.optionCourses ? +`${courses.optionCourses?.length}` : 0}
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
        </>
      )}
    </Layout>
  );
};

export default Curator;

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '../../../loyout/Layout';
import { ITableHeader } from '../../../components/common/Table/TypeDisplay/Desktop/TableHeader';
import { initialPagination, Pagination } from '../../../types';
import { ITableRowItem } from '../../../components/common/Table/TypeDisplay/Desktop/TableBody';
import styles from './index.module.scss';
import Button from '../../../components/common/Button';
import SelectStudent from '../../../components/common/Select/SelectStudent';
import SelectGroupById from '../../../components/common/Select/SelectGroupById';
import TitlePage from '../../../components/common/TitlePage';
import Table from '../../../components/common/Table';
import { useGetListCourses } from '../../../hooks/All/useDropDowns';
import { EstimatesContext } from '../../../context/PagesInAdmin/Estimates';
import { IGetGradesData, IGetGradesParams } from '../../../hooks/PagesInAdmin/useEstimates';
import SelectSemester from '../../../components/common/Select/SelectSemester';
import EstimatesEdit from './modal/EstimatesEdit';
import { Download, Edit, History } from '../../../components/common/Icons';
import EstimatesHistory from './modal/EstimatesHystory';

interface IIsActiveGradesModal {
  openHistory: boolean;
  studentEdit: number;
  gradeEdit: number;
  history: number;
  download: number;
  semester: string;
}

const allCloseModalWindow: IIsActiveGradesModal = {
  openHistory: false,
  studentEdit: 0,
  gradeEdit: 0,
  history: 0,
  download: 0,
  semester: '',
};

interface Filter {
  studentId: string;
  group: string;
  semester: string;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const ActionsButton = ({
  onClickEdit,
  onClickHistory,
  onClickDownload,
  close,
  isActive,
}: {
  onClickEdit: () => void;
  onClickHistory: () => void;
  onClickDownload: () => void;
  close: (semester: string) => void;
  isActive: boolean;
}): JSX.Element => (
  <div className={styles.actions}>
    <Button
      isImg
      type="button"
      onClick={onClickEdit}
    >
      <Edit />
    </Button>
    <Button
      isImg
      type="button"
      onClick={onClickHistory}
    >
      <History />
    </Button>
    <Button
      isImg
      type="button"
      onClick={onClickDownload}
    >
      <Download />
    </Button>
    <div
      className={clsx(
        styles.modalSemester,
        isActive && styles.modalSemester__open,
      )}
    >
      <Button onClick={() => close('1')} type="button">I</Button>
      <Button onClick={() => close('2')} type="button">II</Button>
      <Button onClick={() => close('3')} type="button">III</Button>
      <Button onClick={() => close('4')} type="button">all</Button>
      <Button onClick={() => close('')} type="button">X</Button>
    </div>
  </div>
);

const Estimates = (): JSX.Element => {
  const [isActiveModal, setIsActiveModal] = useState<IIsActiveGradesModal>(allCloseModalWindow);
  const [dataHeader, setDataHeader] = useState<ITableHeader[]>([]);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const { gradesGet, gradesEdit } = EstimatesContext();
  const dropCurses = useGetListCourses();
  const [params, setParams] = useState<Params>({
    filter: { studentId: '', group: '', semester: '' },
    pagination: initialPagination,
  });
  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    dropCurses.getListCourses();
  }, [gradesGet?.data]);

  useEffect(() => {
    const query: IGetGradesParams = {};

    if (params.filter.group) query.groupId = +params.filter.group;
    if (params.filter.studentId) query.studentId = +params.filter.studentId;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    gradesGet?.getEstimateStudent(query);
  }, [
    gradesEdit?.data,
    params.filter.group,
    params.filter.studentId,
    params.filter.semester,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
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
                    styles.gradesCell,
                    isActiveModal.gradeEdit === studentGrades.id && styles.gradesCell__active,
                  )}
                  onClick={() => setIsActiveModal(
                    { ...isActiveModal, gradeEdit: studentGrades.id },
                  )}
                >
                  {`${studentGrades.grade}`}
                </div>
              )
                : '',
            });
          })
          : [];

        return ({
          list: [
            { id: 1, label: `${student.user.lastName} ${student.user.firstName} ${student.user.patronymic} ` },
            { id: 2, label: student.group.name },
            {
              id: 3,
              label: student.grades.reduce((sum, elem) => sum + elem.grade, 0),
            },
            ...arrTableRowsGrade,
            {
              id: ++id,
              label: (
                <ActionsButton
                  onClickEdit={() => {
                    setIsActiveModal(
                      { ...isActiveModal, studentEdit: isActiveModal.gradeEdit ? student.id : 0 },
                    );
                  }}
                  onClickHistory={() => {
                    setIsActiveModal({ ...isActiveModal, history: student.id, openHistory: true });
                  }}
                  onClickDownload={() => {
                    setIsActiveModal({ ...isActiveModal, download: student.id });
                  }}
                  close={(semester: string) => {
                    setIsActiveModal({ ...isActiveModal, openHistory: false, semester });
                  }}
                  isActive={(isActiveModal.history === student.id && isActiveModal.openHistory)}
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
      setParams({ ...params, pagination: gradesGet?.data.meta });
      setDataRow(tableRows(gradesGet.data.items));
    }
  }, [gradesGet?.data, dropCurses.optionCourses, isActiveModal]);

  return (
    <Layout>
      <div className={styles.grades}>
        <TitlePage title="Оцінки" />
        <Table
          filter={(
            <>
              <SelectStudent
                type="filter"
                placeholder="ПІБ"
                isClearable
                isSearchable
                value={params.filter.studentId}
                onChange={(value) => setParams({
                  ...params, filter: { ...params.filter, studentId: value },
                })}
              />
              <SelectGroupById
                type="filter"
                placeholder="Група"
                isClearable
                isSearchable
                value={params.filter.group}
                onChange={(value) => setParams({
                  ...params, filter: { ...params.filter, group: value },
                })}
              />
              <SelectSemester
                type="filter"
                placeholder="Семестр"
                required
                isClearable
                value={params.filter.semester}
                onChange={(value) => setParams({
                  ...params, filter: { ...params.filter, semester: value },
                })}
              />
            </>
          )}
          columScrollHorizontal={dropCurses.optionCourses ? +`${dropCurses.optionCourses?.items.length}` : 0}
          isScroll
          dataHeader={dataHeader}
          gridColumns={styles.columns}
          dataRow={dataRow}
        />
        <EstimatesEdit
          modalActive={!!isActiveModal.studentEdit}
          closeModal={closeModal}
          studentId={isActiveModal.studentEdit}
          gradeId={isActiveModal.gradeEdit}
        />
        <EstimatesHistory
          modalActive={!!(isActiveModal.semester && isActiveModal.history)}
          closeModal={closeModal}
          studentId={isActiveModal.history}
          semester={isActiveModal.semester}
        />
      </div>
    </Layout>
  );
};

export default Estimates;

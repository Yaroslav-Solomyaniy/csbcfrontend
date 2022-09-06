import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { initialPagination, Pagination } from '../../types';
import { ITableRowItem } from '../../components/common/table/TableBody';
import styles from './index.module.scss';
import Button from '../../components/common/Button';
import SelectStudent from '../../components/common/Select/SelectStudent';
import SelectGroupById from '../../components/common/Select/SelectGroupById';
import TitlePage from '../../components/TitlePage';
import Table from '../../components/common/table';
import { useGetListCourses } from '../../hooks/useDropDown';
import { useEstimatesContext } from '../../context/estimates';
import { IGetGradesData, IGetGradesParams } from '../../hooks/useEstimates';
import SelectSemester from '../../components/common/Select/SelectSemester';
import EstimatesEdit from './modal/EstimatesEdit/index';
import EstimatesHistory from './modal/EstimatesHystory';
import { Download, Edit, History } from '../../components/common/Icon';
import pagesStyle from '../pagesStyle.module.scss';

interface IIsActiveGradesModal {
  openHistory: boolean;
  studentEdit: number;
  gradeEdit: number;
  history: number;
  download: number;
  semester: number;
}

const allCloseModalWindow: IIsActiveGradesModal = {
  openHistory: false,
  studentEdit: 0,
  gradeEdit: 0,
  history: 0,
  download: 0,
  semester: 0,
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
  close: (semester: number) => void;
  isActive: boolean;
}): JSX.Element => {
  const [semester, setSemester] = useState(0);

  return (
    <div className={pagesStyle.actions}>
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
        // onClick={() => close(0)}
      >
        <Button onClick={() => close(1)} type="button">I</Button>
        <Button onClick={() => close(2)} type="button">II</Button>
        <Button onClick={() => close(3)} type="button">III</Button>
        <Button onClick={() => close(4)} type="button">all</Button>
        <Button onClick={() => close(0)} type="button">X</Button>
      </div>
    </div>
  );
};

const Estimates = (): JSX.Element => {
  const [isActiveModal, setIsActiveModal] = useState<IIsActiveGradesModal>(allCloseModalWindow);
  const [dataHeader, setDataHeader] = useState<ITableHeader[]>([]);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const { gradesGet } = useEstimatesContext();
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

    // if (params.filter.group) query = params.filter.group;
    if (params.filter.studentId) query.studentId = +params.filter.studentId;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    gradesGet?.getEstimateStudent(query);
  }, [
    params.filter.group,
    params.filter.studentId,
    params.filter.semester,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
  ]);

  const tableRows = (arrTableRows: IGetGradesData[]) => {
    let id = 2;

    return (
      arrTableRows.length ? arrTableRows.map((student: IGetGradesData) => {
        const arrTableRowsGrade = dropCurses.optionCourses
          ? dropCurses.optionCourses.items.map((course) => {
            const studentGrades = student.grades.filter(
              (studentGrade) => studentGrade.course.id === course.id,
            );

            return ({
              id: ++id,
              label: studentGrades.length
                ? (
                  <div
                    className={clsx(
                      styles.gradesCell,
                      isActiveModal.gradeEdit === studentGrades[0].id && styles.gradesCell__ative,
                    )}
                    onClick={() => setIsActiveModal(
                      { ...isActiveModal, gradeEdit: studentGrades[0].id },
                    )}
                  >
                    {`${studentGrades[0].grade}`}
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
            ...arrTableRowsGrade,
            {
              id: ++id,
              label: (
                <ActionsButton
                  onClickEdit={() => {
                    setIsActiveModal(
                      { ...allCloseModalWindow, studentEdit: isActiveModal.gradeEdit ? student.id : 0 },
                    );
                  }}
                  onClickHistory={() => {
                    setIsActiveModal({ ...allCloseModalWindow, history: student.id, openHistory: true });
                  }}
                  onClickDownload={() => {
                    setIsActiveModal({ ...allCloseModalWindow, download: student.id });
                  }}
                  close={(semester: number) => {
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
    let id = 2;

    setDataHeader([
      { id: 1, label: 'ПІБ' },
      { id: 2, label: 'Група' },
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
                required
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
                required
                isClearable
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
          pagination={initialPagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <EstimatesEdit
          modalActive={!!isActiveModal.studentEdit}
          closeModal={closeModal}
          studentId={isActiveModal.studentEdit}
          courseId={isActiveModal.gradeEdit}
        />
        <EstimatesHistory
          modalActive={!!(isActiveModal.semester && isActiveModal.history)}
          closeModal={closeModal}
          studentId={isActiveModal.history}
        />
      </div>
    </Layout>
  );
};

export default Estimates;

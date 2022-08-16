import React, { useEffect, useState } from 'react';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import { initialPagination, Pagination } from '../../types';
import { ITableRowItem } from '../../components/common/table/TableBody';
import styles from './index.module.scss';
import Button from '../../components/common/Button';
import edit from '../../images/table/edit.svg';
import hystory from '../../images/table/history.svg';
import download from '../../images/table/download.svg';
import SelectStudent from '../../components/common/Select/SelectStudent';
import SelectGroupById from '../../components/common/Select/SelectGroupById';
import TitlePage from '../../components/TitlePage';
import Table from '../../components/common/table';
import { useGetListCourses } from '../../hooks/useDropDown';
import { useEstimatesContext } from '../../context/estimates';
import { IGetGradesData, IGetGradesParams } from '../../hooks/useEstimates';
import SelectSemester from '../../components/common/Select/SelectSemester';
import EstimatesEdit from './EstimatesEdit/index';

interface IIsActiveTeacherModalState {
  edit: number;
  history: number;
  download: number;
}

const allCloseModalWindow: IIsActiveTeacherModalState = {
  download: 0,
  edit: 0,
  history: 0,
};

interface Filter {
  studentId: number | null;
  group: string;
  semester: string;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const Estimates = (): JSX.Element => {
  const { estimatesGet } = useEstimatesContext();
  const dropCurses = useGetListCourses();
  const [isActiveModal, setIsActiveModal] = useState<IIsActiveTeacherModalState>(allCloseModalWindow);
  const [dataHeader, setDataHeader] = useState<ITableHeader[]>([]);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [params, setParams] = useState<Params>({
    filter: { studentId: 0, group: '', semester: '' },
    pagination: initialPagination,
  });
  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  const tableRows = (arrTableRows: any) => {
    let id = 1;

    return (
      arrTableRows.length > 0 ? arrTableRows.map((item: IGetGradesData) => {
        const arrTableRowsGrade = dropCurses.optionCourses
          ? dropCurses.optionCourses?.items.map((el) => {
            const estimaates = item.courses.filter((course) => course.id === el.id);

            return ({ id: ++id, label: estimaates.length ? estimaates[0].grade : '-' });
          })
          : [];

        return ({
          list: [
            { id: 1, label: `${/* item.lastName} ${item.firstName} ${item.patronymic */ item.id} ` },
            ...arrTableRowsGrade,
            {
              id: ++id,
              label: (
                <div className={styles.actions}>
                  <Button
                    isImg
                    type="button"
                    className={styles.actions__button_edit}
                    onClick={() => {
                      setIsActiveModal({ ...allCloseModalWindow, edit: item.id });
                    }}
                  >
                    <img src={edit} alt="edit" />
                  </Button>
                  <Button
                    isImg
                    type="button"
                    className={styles.actions__button_delete}
                    onClick={() => {
                      setIsActiveModal({ ...allCloseModalWindow, history: item.id });
                    }}
                  >
                    <img src={hystory} alt="hystory" />
                  </Button>
                  <Button
                    isImg
                    type="button"
                    className={styles.actions__button_delete}
                    onClick={() => {
                      setIsActiveModal({ ...allCloseModalWindow, download: item.id });
                    }}
                  >
                    <img src={download} alt="download" />
                  </Button>
                </div>
              ),
            },
          ],
          key: item.id,
        });
      }) : []);
  };

  useEffect(() => {
    dropCurses.getListCourses();
  }, [estimatesGet?.data]);

  useEffect(() => {
    let id = 1;

    setDataHeader([
      { id: 1, label: 'ПІБ' },
      ...dropCurses.optionCourses ? dropCurses.optionCourses.items.map(
        (el) => ({ id: ++id, label: el.name }),
      ) : [],
      { id: ++id, label: 'Дії' },
    ]);

    if (estimatesGet?.data) {
      setParams({ ...params, pagination: estimatesGet?.data.meta });
      setDataRow(tableRows(estimatesGet.data.items));
    }
  }, [estimatesGet?.data, dropCurses.optionCourses]);

  useEffect(() => {
    const query: IGetGradesParams = {};

    // if (params.filter.group) query = params.filter.group;
    if (params.filter.studentId) query.studentId = params.filter.studentId;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    estimatesGet?.getEstimateStudent(query);
    // }
  }, [
    params.filter.group,
    params.filter.studentId,
    params.filter.semester,
    params.pagination.currentPage,
    params.pagination.itemsPerPage,
  ]);

  return (
    <Layout>
      <div className={styles.students}>
        <TitlePage
          title="Оцінки"
        />
        <Table
          filter={(
            <>
              <SelectGroupById
                type="filter"
                placeholder="Група"
                required
                isClearable
                isSearchable
                value={params.filter.group}
                onChange={(value) => setParams({
                  ...params,
                  filter: {
                    ...params.filter,
                    group: value,
                    studentId: null,
                  },
                })}
              />
              <SelectStudent
                type="filter"
                placeholder="ПІБ"
                value={params.filter.studentId}
                onChange={(value) => setParams({
                  ...params, filter: { ...params.filter, studentId: +value },
                })}
              />
              <SelectSemester
                type="filter"
                placeholder="Семестр"
                value={params.filter.semester}
                onChange={(value) => setParams({
                  ...params, filter: { ...params.filter, studentId: +value },
                })}
              />
            </>
          )}
          columScrollHorizontal={2 + (dropCurses.optionCourses ? +`${dropCurses.optionCourses?.items.length}` : 0)}
          isScroll
          dataHeader={dataHeader}
          gridColumns={styles.columns}
          dataRow={dataRow}
          pagination={initialPagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <EstimatesEdit modalActive={!!isActiveModal.edit} closeModal={closeModal} Id={isActiveModal.edit} />
      </div>
    </Layout>
  );
};

export default Estimates;

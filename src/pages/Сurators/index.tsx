import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import SelectCurator from '../../components/common/Select/SelectCurator';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';
import CuratorCreateModal from './Create';
import { useCuratorContext } from '../../context/curators';
import { IGetCuratorData, IGetCuratorParams } from '../../hooks/useCurators';
import edit from '../../images/table/edit.svg';
import del from '../../images/table/delete.svg';
import CuratorEditModal from './Edit';
import CuratorDeleteModal from './Delete';
import SelectGroupByName from '../../components/common/Select/SelectGroupByName';

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'ПІБ' },
  { id: 2, label: 'Групи' },
  { id: 3, label: 'E-Mail' },
  { id: 4, label: 'Дії' },
];

export interface IIsActiveModalState {
  create: boolean;
  edit: number;
  delete: number;
}

const allCloseModalWindow: IIsActiveModalState = {
  create: false,
  edit: 0,
  delete: 0,
};

interface Filter {
  curator: string;
  group: string;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const Curators = (): JSX.Element => {
  const { getCurators, curatorCreate, curatorDelete, curatorEdit } = useCuratorContext();
  const [params, setParams] = useState<Params>({
    filter: { curator: '', group: '' },
    pagination: initialPagination,
  });
  const [isActiveModal, setIsActiveModal] = useState(allCloseModalWindow);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);

  const closeModal = () => {
    setIsActiveModal(allCloseModalWindow);
  };

  useEffect(() => {
    getCurators?.getCurators();
  }, [curatorCreate?.data, curatorEdit?.data, curatorDelete?.data]);

  useEffect(() => {
    const query: IGetCuratorParams = {};

    /*    if (params.filter.curator) query.curatorId = +params.filter.curator; */
    if (params.filter.group) query.group = params.filter.group;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getCurators?.getCurators(query);
  }, [params.filter.curator, params.filter.group, params.pagination.currentPage, params.pagination.itemsPerPage]);

  useEffect(() => {
    if (getCurators?.data) {
      setParams({ ...params, pagination: getCurators.data.meta });
      setDataRow(getCurators?.data?.items.map((item: IGetCuratorData) => ({
        list: [
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` },
          { id: 2, label: item.groups.map((group) => (group.name)).join(',') },
          { id: 3, label: item.email },
          {
            id: 4,
            label: (
              <div className={styles.actions}>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
                  isImg
                >
                  <img src={edit} alt="edit" />
                </Button>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, delete: item.id })}
                  isImg
                >
                  <img src={del} alt="delete" />
                </Button>
              </div>
            ),
          },
        ],
        key: item.id,
      })));
    }
  }, [getCurators?.data]);

  return (
    <Layout>
      <div className={styles.curators}>
        <TitlePage
          title="Куратори"
          action={(
            <Button
              nameClass="primary"
              size="large"
              className={styles.actions}
              onClick={() => setIsActiveModal({ ...isActiveModal, create: true })}
            >
              Створити
            </Button>
          )}
        />

        <Table
          filter={(
            <>
              <SelectGroupByName
                type="filter"
                placeholder="Група"
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, group: value },
                  pagination: initialPagination,
                })}
                value={params.filter.group}
                isClearable
                isSearchable
              />
              <SelectCurator
                type="filter"
                placeholder="ПІБ"
                onChange={(value) => setParams({
                  ...params,
                  filter: { ...params.filter, curator: value },
                  pagination: initialPagination,
                })}
                value={params.filter.curator}
                isClearable
                isSearchable
              />
            </>
          )}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          pagination={params.pagination}
          onPaginationChange={(newPagination) => setParams({ ...params, pagination: newPagination })}
        />
        <CuratorCreateModal modalActive={isActiveModal.create} closeModal={closeModal} />
        <CuratorEditModal
          modalActive={!!isActiveModal.edit}
          Id={isActiveModal.edit}
          closeModal={closeModal}
        />
        <CuratorDeleteModal
          modalActive={!!isActiveModal.delete}
          Id={isActiveModal.delete}
          closeModal={closeModal}
        />
      </div>
    </Layout>
  );
};

Curators.defaultProps = {
  filter: '',
};

export default Curators;

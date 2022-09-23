import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import Button from '../../components/common/Button/index';
import styles from './index.module.scss';
import pagesStyle from '../pagesStyle.module.scss';
import Layout from '../../loyout/Layout';
import { ITableHeader } from '../../components/common/table/TableHeader';
import Table from '../../components/common/table';
import SelectCurator from '../../components/common/Select/SelectCurator';
import { ITableRowItem } from '../../components/common/table/TableBody';
import { initialPagination, Pagination } from '../../types';
import CuratorCreateModal from './Create';
import { useCuratorContext } from '../../context/curators';
import { IGetCuratorData, IGetCuratorParams } from '../../hooks/useCurators';
import CuratorEditModal from './Edit';
import CuratorDeleteModal from './Delete';
import SelectGroupByName from '../../components/common/Select/SelectGroupByName';
import { Delete, Edit } from '../../components/common/Icon';

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
  groupName: string;
}

interface Params {
  filter: Filter;
  pagination: Pagination;
}

const Curators = (): JSX.Element => {
  const { getCurators, curatorCreate, curatorDelete, curatorEdit } = useCuratorContext();
  const [params, setParams] = useState<Params>({
    filter: { curator: '', groupName: '' },
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

    if (params.filter.curator) query.curatorId = +params.filter.curator;
    if (params.filter.groupName) query.groupName = params.filter.groupName;
    if (params.pagination.currentPage) query.page = params.pagination.currentPage;
    if (params.pagination.itemsPerPage) query.limit = params.pagination.itemsPerPage;

    getCurators?.getCurators(query);
  }, [params.filter.curator, params.filter.groupName, params.pagination.currentPage, params.pagination.itemsPerPage]);

  useEffect(() => {
    if (getCurators?.data) {
      setParams({ ...params, pagination: getCurators.data.meta });
      setDataRow(getCurators?.data?.items.map((item: IGetCuratorData) => ({
        list: [
          { id: 1, label: `${item.lastName} ${item.firstName} ${item.patronymic}` },
          { id: 2, label: item.groups.map((group) => (group.name)).join(', ') },
          { id: 3, label: item.email },
          {
            id: 4,
            label: (
              <div className={pagesStyle.actions}>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, edit: item.id })}
                  isImg
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => setIsActiveModal({ ...isActiveModal, delete: item.id })}
                  isImg
                >
                  <Delete />
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
      <div>
        <TitlePage
          title="Куратори"
          action={(
            <Button
              nameClass="primary"
              size="large"
              className={pagesStyle.buttonsCreate}
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
                  filter: { ...params.filter, groupName: value },
                  pagination: initialPagination,
                })}
                value={params.filter.groupName}
                isClearable
                isSearchable
                isFilter
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
                isFilter
              />
            </>
          )}
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
          pagination={params.pagination}
        />
        <CuratorCreateModal
          modalActive={isActiveModal.create}
          closeModal={closeModal}
        />
        <CuratorEditModal
          modalActive={!!isActiveModal.edit}
          studentId={isActiveModal.edit}
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
